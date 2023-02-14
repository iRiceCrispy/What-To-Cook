from .db import db
from .recipe_ingredient import recipe_ingredient


class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    name = db.Column(db.String(255), unique=True, nullable=False)
    description = db.Column(db.String)

    user = db.relationship('User', back_populates='recipes')
    ingredients = db.relationship('Ingredient', secondary=recipe_ingredient)
    instructions = db.relationship(
        'Instruction', back_populates='recipe', cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'user': self.user.to_safe_dict(),
            'ingredients': [ingredient.to_dict() for ingredient in self.ingredients],
            'instructions': [instruction.to_dict() for instruction in self.instructions],
        }
