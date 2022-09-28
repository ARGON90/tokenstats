from app.models import db
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import trades
from app.models.trades import Trade
from app.forms.portfolio_form import PortfolioForm
from app.api.auth_routes import validation_errors_to_error_messages

trades_routes = Blueprint('trades', __name__)


@trades_routes.route('/')
def get_all_trades():
    trades = Trade.query.all()
    trades_dict = {trade.id: trade.to_dict() for trade in trades}
    return trades_dict
