from .db import db
from .pantry import pantry
from .recipe_ingredient import recipe_ingredient


class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    verified = db.Column(db.Boolean, server_default=db.false(), nullable=False)

    recipes = db.relationship(
        'Recipe', secondary=recipe_ingredient, back_populates='ingredients')
    users = db.relationship(
        'User', secondary=pantry, back_populates='pantry')

    @property
    def recipe_count(self):
        return len(self.recipes)

    @property
    def user_count(self):
        return len(self.users)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'verified': self.verified,
            'recipe_count': self.recipe_count,
            'user_count': self.user_count
        }
