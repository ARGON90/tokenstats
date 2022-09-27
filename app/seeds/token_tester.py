
import requests
import json



def tester():
    response = requests.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ccardano%2Csolana&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true')

    test = json.loads(response.text)

    for key, value in test.items():
        name = key
        price = value['usd']
        # print(key)
        # print(value['usd'])
        print(value['usd_market_cap'])
        print(value['usd_24h_vol'])
        print(value['usd_24h_change'])

tester()
