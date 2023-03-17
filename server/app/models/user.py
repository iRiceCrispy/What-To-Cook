from flask_login import UserMixin
from werkzeug.security import check_password_hash, generate_password_hash
from .db import db
from .pantry import pantry
from .recipe_like import recipe_like


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), unique=True, nullable=False)
    email = db.Column(db.String(320), unique=True, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    pantry = db.relationship(
        'Ingredient', secondary=pantry, back_populates='users')
    recipes = db.relationship('Recipe', back_populates='user')
    liked_recipes = db.relationship(
        'Recipe', secondary=recipe_like, back_populates='likes')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_safe_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'pantry': [ingredient.to_dict() for ingredient in self.pantry],
            'recipes': [recipe.to_dict() for recipe in self.recipes],
            'liked_recipes': [recipe.id for recipe in self.liked_recipes]
        }
