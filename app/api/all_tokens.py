from app.models import db
from http.cookies import _quote
from urllib import response
from flask import Blueprint, request
from requests import Session
from app.models.tokens import Token
from app.forms.tokens_form import UpdateToken
import requests
import json

all_tokens = Blueprint('tokens', __name__)


@all_tokens.route('/')
def get_all_tokens():
    tokens = Token.query.all()
    tokens_dict = {token.id: token.to_dict() for token in tokens}

    return tokens_dict

@all_tokens.route('/refresh')
def update_tokens():

    response = requests.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ccardano%2Csolana&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true')
    fetch = json.loads(response.text)
    this_token = Token.query.filter(Token.name.like('c%')).first()

    for key, value in fetch.items():
        print('FOR LOOP', key)
        this_token = Token.query.filter(Token.name.like(key)).first()
        this_token.price=value['usd']
        this_token.dailyVolume=value['usd_24h_vol']
        this_token.dailyChange=value['usd_24h_change']
        this_token.marketCap=value['usd_market_cap']
        db.session.commit()

    tokens = Token.query.all()
    tokens_dict = {token.id: token.to_dict() for token in tokens}

    return tokens_dict




# CMC API:
    # def price_get(token):
    #     url = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest'
    #     parameters = {
    #         'slug': token,
    #         'convert': 'USD'
    #     }
    #     headers = {
    #         'Accepts': 'application/json',
    #         'X-CMC_PRO_API_KEY': '2721af05-ab31-45df-a549-732c48413d3b'
    #     }

    #     session = Session()
    #     session.headers.update(headers)
    #     response = session.get(url, params=parameters)
    #     data = json.loads(response.text)['data']
    #     num = (list(data))
    #     num1 = (num[0])
    #     name = json.loads(response.text)['data'][num1]['name']
    #     quote = json.loads(response.text)['data'][num1]['quote']['USD']['price']

    #     print(f"Current price of {name} is {quote}")

    #     return quote

    # token_list = Token.query.all()
    # tokens_dict = [token.to_dict() for token in token_list]

    # token_list_new = []
    # i = 0
    # while i < len(token_list):
    #     add = {}
    #     token = token_list[i].to_dict()
    #     add['id'] = token['id']
    #     add['name'] = token['name']
    #     add['price'] = price_get(token['name'])

    #     # print(add)
    #     token_list_new.append(add)
    #     i = i + 1

    # new_dict = {item['id']:item for item in token_list_new}
    # print(new_dict)
