from app.models import db
from flask import Blueprint
from app.models.tokens import Token
import requests
import json

all_tokens = Blueprint('tokens', __name__)
# comment for push

@all_tokens.route('/')
def get_all_tokens():
    tokens = Token.query.all()
    tokens_dict = {token.id: token.to_dict() for token in tokens}

    return tokens_dict

@all_tokens.route('/refresh')
def update_tokens():

    response = requests.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ctether%2Cusd-coin%2Cbnb%2Cxrp%2Cbinance-usd%2Ccardano%2Csolana%2Cdogecoin%2Cpolkadot%2Cdai%2Cpolygon%2Ctron%2Cavalanche%2Cuniswap%2Cokb%2Cleo-token%2Clitecoin%2Ccosmos-hub%2Cethereum-classic%2Cchainlink%2Cftx-token%2Cstellar%2Cnear%2Cmonero%2Calgorand%2Cbitcoin-cash%2Cterra-luna-classic%2Cquant%2Cflow%2Capecoin%2Cvechain%2Cfilecoin%2Cinternet-computer%2Chedera%2Cfrax%2Cchiliz%2Ctezos%2Cdecentraland%2Cthe-sandbox%2Ceos%2Caxie-infinity%2Celrond%2Ctheta-network%2Caave%2Clido-dao%2Cbitcoin-sv%2Cpax-dollar%2Ckucoin-shares%2Ctrue-usd%2Ciota%2Ce-cash%2Cusdd%2Cthe-graph%2Cbittorrent&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true')
    # response = requests.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ccardano%2Csolana&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true')

    fetch = json.loads(response.text)

    print(fetch, 'FETCH')

    print(fetch.items())

    for key, value in fetch.items():

        print(key, 'KEY')

        v1 = key.split('-')
        v2 = ' '.join(v1)
        v3 = v2.title()

        this_token = Token.query.filter(Token.name.like(v3)).first()
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
