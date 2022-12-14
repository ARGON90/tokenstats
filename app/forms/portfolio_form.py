from unicodedata import name
from flask_wtf import FlaskForm
from wtforms.fields import (
    TextAreaField, DateTimeField, IntegerField, StringField
)
from wtforms.validators import DataRequired
from datetime import datetime


class PortfolioForm(FlaskForm):
    user_id = IntegerField("User Id")
    name = StringField("Name", validators=[DataRequired()])
