from app.models import db, Ingredient
from .users import demo

ingredients = {
    'salt': Ingredient(name='salt', verified=True),
    'pepper': Ingredient(name='pepper', verified=True),
    'sugar': Ingredient(name='sugar', verified=True),
    'butter': Ingredient(name='butter', verified=True),
    'oil': Ingredient(name='oil', verified=True),
    'chicken': Ingredient(name='chicken', verified=True),
    'beef': Ingredient(name='beef', verified=True),
    'pork': Ingredient(name='pork', verified=True),
    'lamb': Ingredient(name='lamb', verified=True),
    'salmon': Ingredient(name='salmon', verified=True),
    'egg': Ingredient(name='egg', verified=True),
    'cabbage': Ingredient(name='cabbage', verified=True),
    'lettuce': Ingredient(name='lettuce', verified=True),
    'tomato': Ingredient(name='tomato', verified=True),
    'onion': Ingredient(name='onion', verified=True),
    'potato': Ingredient(name='potato', verified=True),
    'kimchi': Ingredient(name='kimchi', verified=True),
    'rice': Ingredient(name='rice', verified=True),
    'pasta': Ingredient(name='pasta', verified=True),
    'noodle': Ingredient(name='noodle', verified=True),
}

ingredient_list = list(ingredients.values())


def seed_ingredient():
    db.session.add_all(ingredient_list)
    demo.pantry = ingredient_list


def unseed_ingredient():
    db.session.execute('TRUNCATE TABLE "ingredient" RESTART IDENTITY CASCADE;')
