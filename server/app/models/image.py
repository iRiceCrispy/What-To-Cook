from .db import db


class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'))
    order = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    src = db.Column(db.Text, unique=True, nullable=False)

    recipe = db.relationship('Recipe', back_populates='images')

    def to_dict(self):
        return {
            'id': self.id,
            'order': self.order,
            'description': self.description,
            'src': self.src
        }
