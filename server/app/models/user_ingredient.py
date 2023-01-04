from sqlalchemy import ForeignKey
from .db import db

user_ingredient = db.Table(
    'user_ingredient',
    db.Column('user_id', db.Integer, db.ForeignKey(
        'user.id'), primary_key=True),
    db.Column('ingredient_id', db.Integer, db.ForeignKey(
        'ingredient.id'), primary_key=True)
)
