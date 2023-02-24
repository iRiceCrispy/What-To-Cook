from base64 import b64decode
from uuid import uuid4
from firebase_admin import storage
from flask import Blueprint, request
from flask_login import login_required
from sqlalchemy import desc
from app.forms import RecipesForm, RecipeLikesForm, RecipeViewsForm
from app.models import db, Image, Ingredient, Instruction, Recipe, User

recipes = Blueprint('recipes', __name__)


@recipes.get('')
def get():
    """
    Get list of all recipes
    """
    recipes = db.session.scalars(db.select(Recipe))
    return {'recipes': [recipe.to_dict() for recipe in recipes]}


@recipes.put('/<int:id>')
@login_required
def update(id):
    """
    Update a recipe
    """
    form = RecipesForm()
    form.process(data=request.json)
    form.csrf_token.data = request.cookies.get('csrf_token')

    if form.validate_on_submit():
        recipe = db.session.get(Recipe, id)
        name = form.data.get('name')
        description = form.data.get('description')

        def get_ingredient_from_db(data):
            id = data.get('id')
            name = data.get('name')

            ingredient = db.session.get(Ingredient, id) if id is not None else\
                db.session.scalar(db.select(Ingredient).where(
                    Ingredient.name == name))
            if ingredient is None:
                ingredient = Ingredient(name=name)

            return ingredient

        def get_instruction_from_db(data):
            order = data.get('order')
            body = data.get('body')

            instruction = list(filter(lambda instruction: instruction.order == order,
                                      recipe.instructions))[0] if order <= len(recipe.instructions) else Instruction(order=order, body=body)
            instruction.body = body

            return instruction

        def get_image_from_db(data):
            id = data.get('id')
            order = data.get('order')
            description = data.get('description')
            string64 = data.get('string64')

            if (id is not None):
                image = db.session.get(Image, id)
                image.order = order
                image.description = description

                return image
            else:
                bucket = storage.bucket()
                uuid = uuid4()
                code = b64decode(string64)

                blob = bucket.blob(f'images/recipes/{uuid}')
                blob.upload_from_string(code, content_type='image/png')

                return Image(order=order, description=description, src=uuid)

        ingredients = [get_ingredient_from_db(data)
                       for data in form.data.get('ingredients')]

        instructions = [get_instruction_from_db(data)
                        for data in form.data.get('instructions')]

        images = [get_image_from_db(data) for data in form.data.get(
            'images')] if len(form.data.get('images')) else []

        for recipe_image in recipe.images:
            removed = not any(recipe_image.id == image.id for image in images)

            if (removed):
                bucket = storage.bucket()
                blob = bucket.blob(f'images/recipes/{recipe_image.src}')
                blob.delete()

        recipe.name = name
        recipe.description = description
        recipe.ingredients = ingredients
        recipe.instructions = instructions
        recipe.images = images

        db.session.commit()

        return {'recipe': recipe.to_dict()}
    else:
        return {'errors': form.errors}, 401


@recipes.delete('/<int:id>')
@login_required
def delete(id):
    """
    Delete a recipe
    """
    recipe = db.session.get(Recipe, id)

    db.session.delete(recipe)
    db.session.commit()

    return {'message': 'Recipe deleted'}


@recipes.post('/<int:id>/likes')
@login_required
def add_like(id):
    """
    Adds a like to a recipe
    """
    form = RecipeLikesForm()
    form.process(data=request.json)
    form.csrf_token.data = request.cookies.get('csrf_token')

    if form.validate_on_submit():
        user_id = form.data.get('user_id')

        recipe = db.session.get(Recipe, id)
        user = db.session.get(User, user_id)

        recipe.likes.append(user)

        db.session.commit()

    return {'likes': recipe.to_dict().get('likes')}


@recipes.delete('/<int:id>/likes')
@login_required
def remove_like(id):
    """
    Removes a like from a recipe
    """
    form = RecipeLikesForm()
    form.process(data=request.json)
    form.csrf_token.data = request.cookies.get('csrf_token')

    if form.validate_on_submit():
        user_id = form.data.get('user_id')

        recipe = db.session.get(Recipe, id)
        user = db.session.get(User, user_id)

        recipe.likes.remove(user)

        db.session.commit()

    return {'likes': recipe.to_dict().get('likes')}


@recipes.post('/<int:id>/views')
def increase_views(id):
    """
    Increase view count of a recipe by 1
    """
    form = RecipeViewsForm()
    form.csrf_token.data = request.cookies.get('csrf_token')

    if form.validate_on_submit():
        recipe = db.session.get(Recipe, id)

        recipe.views += 1

        db.session.commit()

        if recipe:
            return {'views': recipe.views}
        else:
            return {'message': 'recipe not found.'}, 404
    else:
        return {'errors': form.errors}, 401
