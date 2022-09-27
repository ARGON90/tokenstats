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

    response = requests.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ccardano%2Csolana&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true')

    test = json.loads(response.text)

    return test


# @all_tokens.route('/update', methods=['PUT'])
# def edit_user_book(id):
#     form = UpdateToken()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     data = form.data

#     if form.validate_on_submit():
#         book = Book.query.get(id)
#         book.title = data['title']
#         book.year = data['year']
#         book.author = data['author']
#         book.description = data['description']
#         book.banned = data['banned']
#         book.image_url = data['image_url']

#         db.session.commit()
#         return book.to_dict()

#     return {'errors': validation_errors_to_error_messages(form.errors)}, 400
