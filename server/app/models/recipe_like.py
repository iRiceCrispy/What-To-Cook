from .db import db

recipe_like = db.Table(
    'recipe_like',
    db.Column('recipe_id', db.Integer, db.ForeignKey(
        'recipe.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey(
        'user.id'), primary_key=True)
)
