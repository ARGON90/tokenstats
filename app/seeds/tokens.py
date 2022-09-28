from app.models.tokens import db, Token
import requests
import json

def seed_tokens():

    response = requests.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ccardano%2Csolana&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true')

    test = json.loads(response.text)

    for key, value in test.items():



        name=key
        price=round(value['usd'], 4)
        dailyVolume=round(value['usd_24h_vol'], 4)
        dailyChange=round(value['usd_24h_change'], 4)
        marketCap=round(value['usd_market_cap'], 4)

        db.session.add(Token(
            name=name, price=price, dailyVolume=dailyVolume, dailyChange=dailyChange, marketCap=marketCap
        ))

    db.session.commit()


def undo_tokens():
  db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
  db.session.commit()
