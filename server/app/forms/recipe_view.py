from flask_wtf import FlaskForm
from wtforms import HiddenField


class RecipeViewsForm(FlaskForm):
    hidden = HiddenField()
