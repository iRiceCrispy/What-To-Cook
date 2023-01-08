from .db import db

recipe_ingredient = db.Table(
    'recipe_ingredient',
    db.Column('recipe_id', db.Integer, db.ForeignKey(
        'recipe.id'), primary_key=True),
    db.Column('ingredient_id', db.Integer, db.ForeignKey(
        'ingredient.id'), primary_key=True)
)
