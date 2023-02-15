from .db import db

pantry = db.Table(
    'pantry',
    db.Column('user_id', db.Integer, db.ForeignKey(
        'user.id'), primary_key=True),
    db.Column('ingredient_id', db.Integer, db.ForeignKey(
        'ingredient.id'), primary_key=True)
)
