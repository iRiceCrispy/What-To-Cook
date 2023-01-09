from lib2to3.pgen2.token import OP
from flask_wtf import FlaskForm
from wtforms import BooleanField, FieldList, FormField, IntegerField, StringField, Form
from wtforms.validators import DataRequired, Optional


class IngredientForm(Form):
    id = IntegerField(validators=[Optional()])
    name = StringField(validators=[DataRequired()])
    verified = BooleanField(validators=[Optional()])


class InstructionForm(Form):
    order = IntegerField(validators=[DataRequired()])
    body = StringField(validators=[DataRequired()])


class RecipesForm(FlaskForm):
    name = StringField(validators=[DataRequired()])
    description = StringField(validators=[Optional()])
    ingredients = FieldList(FormField(IngredientForm))
    instructions = FieldList(FormField(InstructionForm))
