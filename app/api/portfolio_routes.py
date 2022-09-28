from app.models import db
from http.cookies import _quote
from flask import Blueprint, request
from requests import Session
from app.models.portfolio import Portfolio
import requests
import json

portfolios_routes = Blueprint('portfolios', __name__)


@portfolios_routes.route('/')
def get_all_tokens():
    portfolios = Portfolio.query.all()
    portfolios_dict = {portfolio.id: portfolio.to_dict() for portfolio in portfolios}
    
    return portfolios_dict
