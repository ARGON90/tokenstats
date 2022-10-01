from app.models.tokens import db, Token
import requests
import json

def seed_tokens():

    # response = requests.get('')
    response = requests.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ctether%2Cusd-coin%2Cbnb%2Cxrp%2Cbinance-usd%2Ccardano%2Csolana%2Cdogecoin%2Cpolkadot%2Cdai%2Cpolygon%2Ctron%2Cavalanche%2Cuniswap%2Cokb%2Cleo-token%2Clitecoin%2Ccosmos-hub%2Cethereum-classic%2Cchainlink%2Cftx-token%2Cstellar%2Cnear%2Cmonero%2Calgorand%2Cbitcoin-cash%2Cterra-luna-classic%2Cquant%2Cflow%2Capecoin%2Cvechain%2Cfilecoin%2Cinternet-computer%2Chedera%2Cfrax%2Cchiliz%2Ctezos%2Cdecentraland%2Cthe-sandbox%2Ceos%2Caxie-infinity%2Celrond%2Ctheta-network%2Caave%2Clido-dao%2Cbitcoin-sv%2Cpax-dollar%2Ckucoin-shares%2Ctrue-usd%2Ciota%2Ce-cash%2Cusdd%2Cthe-graph%2Cbittorrent&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true')
    # response = requests.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ccardano%2Csolana&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true')

    test = json.loads(response.text)

    for key, value in test.items():



        name=key
        price=value['usd']
        dailyVolume=value['usd_24h_vol']
        dailyChange=value['usd_24h_change']
        marketCap=value['usd_market_cap']

        db.session.add(Token(
            name=name, price=price, dailyVolume=dailyVolume, dailyChange=dailyChange, marketCap=marketCap
        ))

    db.session.commit()


def undo_tokens():
  db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
  db.session.commit()
