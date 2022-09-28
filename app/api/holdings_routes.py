from app.models import db
from http.cookies import _quote
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models.holdings import Holdings
from app.forms.portfolio_form import PortfolioForm
from app.api.auth_routes import validation_errors_to_error_messages

holdings_routes = Blueprint('holdings', __name__)


@holdings_routes.route('/')
@login_required
def get_user_holdings():
    holdings = Holdings.query.all()
    holdings_dict = {holding.id: holding.to_dict() for holding in holdings}
    return holdings_dict
