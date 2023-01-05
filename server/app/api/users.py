from flask import Blueprint, request
from flask_login import login_required
from app.forms import IngredientsForm
from app.models import db, Ingredient, User

users = Blueprint('users', __name__)


@users.get('/<int:user_id>/ingredients')
def get_ingredients(user_id):
    """
    Get list of ingredients of a user
    """
    user = db.session.get(User, user_id)
    if user:
        return {'ingredients': user.to_dict().get('ingredients')}
    else:
        return {'message': 'User not found.'}, 404


@users.post('/<int:user_id>/ingredients')
def add_ingredients(user_id):
    """
    Add ingredients to a user's ingredient list
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

        user.ingredients.extend(ingredients)
        db.session.commit()

        return {'ingredients': user.to_dict().get('ingredients')}
    else:
        return {'errors': form.errors}, 401


@users.delete('/<int:user_id>/ingredients')
def remove_ingredients(user_id):
    """
    Remove ingredients from a user's ingredient list
    """
    form = IngredientsForm()
    form.process(data=request.json)
    form.csrf_token.data = request.cookies.get('csrf_token')

    if form.validate_on_submit():
        user = db.session.get(User, user_id)

        ingredients = [db.session.get(Ingredient, data.get('id'))
                       for data in form.data.get('ingredients')]

        print(ingredients)

        for ingredient in ingredients:
            if ingredient in user.ingredients:
                user.ingredients.remove(ingredient)

        db.session.commit()

        return {'ingredients': user.to_dict().get('ingredients')}
    else:
        return {'errors': form.errors}, 401


@users.before_request
@login_required
def login_required():
    pass
