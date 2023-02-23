from .db import db
from .recipe_ingredient import recipe_ingredient
from .recipe_like import recipe_like


class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    name = db.Column(db.String(255), unique=True, nullable=False)
    description = db.Column(db.String)
    views = db.Column(db.Integer, server_default='0', nullable=False)

    user = db.relationship('User', back_populates='recipes')
    ingredients = db.relationship('Ingredient', secondary=recipe_ingredient)
    instructions = db.relationship(
        'Instruction', back_populates='recipe', cascade="all, delete")
    likes = db.relationship(
        'User', secondary=recipe_like, back_populates='liked_recipes')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'user': self.user.to_safe_dict(),
            'ingredients': [ingredient.to_dict() for ingredient in self.ingredients],
            'instructions': [instruction.to_dict() for instruction in self.instructions],
            'likes': len(self.likes),
            'views': self.views
        }
