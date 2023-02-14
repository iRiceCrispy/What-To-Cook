from flask import Blueprint, request
from flask_login import login_required
from app.forms import RecipesForm
from app.models import db, Ingredient, Instruction, Recipe

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

        ingredients = [get_ingredient_from_db(data)
                       for data in form.data.get('ingredients')]

        instructions = [get_instruction_from_db(data)
                        for data in form.data.get('instructions')]

        recipe.name = name
        recipe.description = description
        recipe.ingredients = ingredients
        recipe.instructions = instructions

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
