from flask import Blueprint
from app.models import db, Ingredient

ingredients = Blueprint('ingredients', __name__)


@ingredients.get('')
def get():
    """
    Get list of all ingredients
    """
    ingredients = db.session.scalars(db.select(Ingredient))
    return {'ingredients': [ingredient.to_dict() for ingredient in ingredients]}
