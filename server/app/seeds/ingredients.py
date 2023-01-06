from app.models import db, Ingredient
from .users import demo

ingredients = [
    Ingredient(name='salt', verified=True),
    Ingredient(name='pepper', verified=True),
    Ingredient(name='sugar', verified=True),
    Ingredient(name='chicken', verified=True),
    Ingredient(name='beef', verified=True),
    Ingredient(name='pork', verified=True),
    Ingredient(name='lamb', verified=True),
    Ingredient(name='salmon', verified=True),
    Ingredient(name='egg', verified=True),
    Ingredient(name='cabbage', verified=True),
    Ingredient(name='lettuce', verified=True),
    Ingredient(name='tomato', verified=True),
    Ingredient(name='onion', verified=True),
    Ingredient(name='potato', verified=True),
    Ingredient(name='kimchi', verified=True),
    Ingredient(name='rice', verified=True),
    Ingredient(name='pasta', verified=True),
    Ingredient(name='noodle', verified=True),
]


def seed_ingredient():
    db.session.add_all(ingredients)
    demo.ingredients.extend(ingredients)


def unseed_ingredient():
    db.session.execute('TRUNCATE TABLE "ingredient" RESTART IDENTITY CASCADE;')
