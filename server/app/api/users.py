from base64 import b64decode
from uuid import uuid4
from firebase_admin import storage
from flask import Blueprint, request
from flask_login import login_required
from app.forms import IngredientsForm, RecipesForm
from app.models import db, Image, Ingredient, Instruction, Recipe, User

users = Blueprint('users', __name__)


@users.get('/<int:user_id>/pantry')
def get_pantry(user_id):
    """
    Get ingredients in a user's pantry
    """
    user = db.session.get(User, user_id)
    if user:
        return {'pantry': user.to_dict().get('pantry')}
    else:
        return {'message': 'User not found.'}, 404


@users.put('/<int:user_id>/pantry')
def update_pantry(user_id):
    """
    Update ingredients in a user's pantry
    """
    form = IngredientsForm()
    form.process(data=request.json)
    form.csrf_token.data = request.cookies.get('csrf_token')

    if form.validate_on_submit():
        user = db.session.get(User, user_id)

        def get_from_db(data):
            id = data.get('id')
            name = data.get('name')

            ingredient = db.session.get(Ingredient, id) if id is not None else\
                db.session.scalar(db.select(Ingredient).where(
                    Ingredient.name == name))
            if ingredient is None:
                ingredient = Ingredient(name=name)

            return ingredient

        ingredients = [get_from_db(data)
                       for data in form.data.get('ingredients')]

        user.pantry = ingredients
        db.session.commit()

        return {'pantry': user.to_dict().get('pantry')}
    else:
        return {'errors': form.errors}, 401


@users.post('/<int:user_id>/recipes')
def add_recipe(user_id):
    """
    Add a recipe
    """
    form = RecipesForm()
    form.process(data=request.json)
    form.csrf_token.data = request.cookies.get('csrf_token')

    if form.validate_on_submit():
        user = db.session.get(User, user_id)

        def get_ingredient_from_db(data):
            id = data.get('id')
            name = data.get('name')

            ingredient = db.session.get(Ingredient, id) if id is not None else\
                db.session.scalar(db.select(Ingredient).where(
                    Ingredient.name == name))
            if ingredient is None:
                ingredient = Ingredient(name=name)

            return ingredient

        def create_instruction(data):
            order = data.get('order')
            body = data.get('body')

            return Instruction(order=order, body=body)

        def create_image(data):
            order = data.get('order')
            description = data.get('description')
            string64 = data.get('string64')

            bucket = storage.bucket()
            uuid = uuid4()
            code = b64decode(string64)

            blob = bucket.blob(f'images/recipes/{uuid}')
            blob.upload_from_string(code, content_type='image/png')

            return Image(order=order, description=description, src=uuid)

        ingredients = [get_ingredient_from_db(data)
                       for data in form.data.get('ingredients')]

        instructions = [create_instruction(data)
                        for data in form.data.get('instructions')]

        images = [create_image(data) for data in form.data.get(
            'images')] if len(form.data.get('images')) else []

        recipe = Recipe(
            name=form.data.get('name'),
            description=form.data.get('description'),
            ingredients=ingredients,
            instructions=instructions,
            images=images
        )

        user.recipes.append(recipe)
        db.session.commit()

        return {'recipe': recipe.to_dict()}
    else:
        return {'errors': form.errors}, 401


@users.get('/<int:user_id>/liked_recipes')
def get_user(user_id):
    """
    Get a user's details
    """
    user = db.session.get(User, user_id)
    if user:
        return {'recipes': user.to_dict().get('liked_recipes')}
    else:
        return {'message': 'User not found.'}, 404


@users.before_request
@login_required
def login_required():
    pass
