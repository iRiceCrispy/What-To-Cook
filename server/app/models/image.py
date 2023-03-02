from firebase_admin import storage
from .db import db


class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'))
    order = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    src = db.Column(db.Text, unique=True, nullable=False)

    recipe = db.relationship('Recipe', back_populates='images')

    @property
    def url(self):
        bucket = storage.bucket()
        blob = bucket.blob(f'images/recipes/{self.src}')

        return blob.public_url

    def to_dict(self):
        return {
            'id': self.id,
            'order': self.order,
            'description': self.description,
            'url': self.url
        }
