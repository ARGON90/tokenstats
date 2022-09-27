from app.models.tokens import db, Token
from .tokens_list import tokens_list_all
import requests
import json

def seed_tokens():

    # response = requests.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ccardano%2Csolana&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true')

    # test = json.loads(response.text)

    for token in tokens_list_all:
        db.session.add(Token(
            name=token,
            price=0
        ))

    db.session.commit()


def undo_tokens():
  db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
  db.session.commit()
