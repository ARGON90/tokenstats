from app.models import db
from http.cookies import _quote
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models.portfolio import Portfolio
from app.forms.portfolio_form import PortfolioForm
from app.api.auth_routes import validation_errors_to_error_messages

portfolios_routes = Blueprint('portfolios', __name__)


@portfolios_routes.route('/')
def get_all_tokens():
    portfolios = Portfolio.query.all()
    portfolios_dict = {portfolio.id: portfolio.to_dict() for portfolio in portfolios}
    return portfolios_dict

@portfolios_routes.route('/', methods=["POST"])
@login_required
def create_portfolio():
    form = PortfolioForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    print(data)
    if form.validate_on_submit():
        portfolio = Portfolio(
            user_id=current_user.id,
            name=data['name'],
        )

        db.session.add(portfolio)
        db.session.commit()
        return portfolio.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@portfolios_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_user_portfolio(id):
    form = PortfolioForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data

    if form.validate_on_submit():
        portfolio = Portfolio.query.get(id)
        portfolio.user_id=current_user.id
        portfolio.name=data['name']

        db.session.commit()
        return portfolio.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@portfolios_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_user_portfolio(id):
    portfolio = Portfolio.query.get(id)
    db.session.delete(portfolio)
    db.session.commit()
    portfolios = Portfolio.query.all()
    portfolios_dict = {portfolio.id: portfolio.to_dict() for portfolio in portfolios}
    return portfolios_dict
