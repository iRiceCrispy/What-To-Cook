from flask_wtf import FlaskForm
from wtforms import BooleanField, FieldList, FormField, IntegerField, StringField, Form
from wtforms.validators import DataRequired, Optional


class IngredientForm(Form):
    id = IntegerField(validators=[Optional()])
    name = StringField(validators=[DataRequired()])
    verified = BooleanField(validators=[Optional()])


class IngredientsForm(FlaskForm):
    ingredients = FieldList(FormField(IngredientForm))
