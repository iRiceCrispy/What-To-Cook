from .db import db


class Instruction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'))
    order = db.Column(db.Integer, nullable=False)
    body = db.Column(db.String, nullable=False)

    recipe = db.relationship('Recipe', back_populates='instructions')

    def to_dict(self):
        return {
            'id': self.id,
            'order': self.order,
            'body': self.body
        }
