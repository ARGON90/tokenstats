import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTokensThunk } from '../store/all-tokens-store';

export const tokenImages = {
    "The Sandbox": "https://static.coinstats.app/coins/the-sandboxPFZ.png",
    "Ftx Token": "https://static.coinstats.app/coins/ftx-tokenwL9.png",
    "Eos": "https://static.coinstats.app/coins/EOSGAmMm.png",
    "Tron": "https://static.coinstats.app/coins/TRONxJljY.png",
    "Lido Dao": "https://static.coinstats.app/coins/lido-daokvE.png",
    "Bitcoin Cash": "https://static.coinstats.app/coins/1646234235578.png",
    "Usd Coin": "https://static.coinstats.app/coins/1650455825065.png",
    "Dai": "https://static.coinstats.app/coins/1579614462667.png",
    "Uniswap": "https://static.coinstats.app/coins/1601456093963.png",
    "Chiliz": "https://static.coinstats.app/coins/Chilizo7VuK.png",
    "Tezos": "https://static.coinstats.app/coins/TezosKe2SC.png",
    "Polkadot": "https://static.coinstats.app/coins/1641284295533.png",
    "Dogecoin": "https://static.coinstats.app/coins/DogecoinIZai5.png",
    "Iota": "https://static.coinstats.app/coins/1594216225344.png",
    "Frax": "https://static.coinstats.app/coins/1657104428991.png",
    "Filecoin": "https://static.coinstats.app/coins/filecoinfjG.png",
    "Chainlink": "https://static.coinstats.app/coins/ChainLink0JkIR.png",
    "Ethereum Classic": "https://static.coinstats.app/coins/ethereum-classicPfU.png",
    "Internet Computer": "https://static.coinstats.app/coins/internet-computer4kw.png",
    "Binance Usd": "https://static.coinstats.app/coins/binance-usdcP4.png",
    "Axie Infinity": "https://static.coinstats.app/coins/axie-infinity7o3.png",
    "Vechain": "https://static.coinstats.app/coins/VeChainTTaJ5.png",
    "Litecoin": "https://static.coinstats.app/coins/LitecoinGiD2Q.png",
    "Near": "https://static.coinstats.app/coins/nearNPL.png",
    "Stellar": "https://static.coinstats.app/coins/1594216268358.png",
    "Cardano": "https://static.coinstats.app/coins/CardanojXddT.png",
    "Algorand": "https://static.coinstats.app/coins/AlgorandoUhKT.png",
    "Solana": "https://static.coinstats.app/coins/solanambZ.png",
    "Tether": "https://static.coinstats.app/coins/1650455771843.png",
    "Ethereum": "https://static.coinstats.app/coins/1650455629727.png",
    "Bitcoin": "https://static.coinstats.app/coins/1650455588819.png",
    "Decentraland": "https://static.coinstats.app/coins/Decentraland7FerE.png",
    "Aave": "https://static.coinstats.app/coins/aaveZSi.png",
    "Flow": "https://static.coinstats.app/coins/flowSmF.png",
    "Okb": "https://static.coinstats.app/coins/OKBPuyWG.png",
    "Leo Token": "https://static.coinstats.app/icons/leo.png",
    "Usdd": "https://static.coinstats.app/coins/usddtEo.png",
    "Kucoin Shares": "https://static.coinstats.app/coins/1657534923309.png",
    "Monero": "https://static.coinstats.app/coins/MoneroxCKAn.png",
    "True Usd": "https://static.coinstats.app/coins/TrueUSDgdH0q.png",
    "Bittorrent": "https://static.coinstats.app/coins/BitTorrent3802L.png",
    "Apecoin": "https://static.coinstats.app/coins/1653550754056.png",
    "The Graph": "https://static.coinstats.app/coins/the-graphdCm.png",
}


function Tokens() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllTokensThunk())
    }, [dispatch])

    const allTokens = useSelector((state) => Object.values(state?.tokens))

    console.log(allTokens, 'ALL TOKENS')

    const getDecimals = (num) => {
        let str = num.toString()
        let array = str.split('.')
        if (array[0].length > 3) {
            return array[0]
        } else {
            return num.toFixed(2)
        }
    }

    function getTokenPrice(rawNum) {
        const prices = rawNum
        let localeString = prices.toLocaleString('usa-US', { style: 'currency', currency: 'USD' });
        return localeString
    }



    return (
        <>
            <div className='splash-page' >
                <div className="splash-header">All Tokens Information</div>

                <div className="splash-body">
                    <div className='splash-header-container'>
                        <div className='splash-col-1'>TOKEN</div>
                        <div className='splash-col-2'>PRICE</div>
                        <div className='splash-cols'>24H CHANGE</div>
                        <div className='splash-cols'>24H VOLUME</div>
                        <div className='splash-cols flex-end'>MARKET CAP</div>
                    </div>


                    {allTokens.map((token) =>
                        <div key={token.id} className='splash-individual-container'>
                            <div className="splash-col-1">
                                <img className='token-image' src={`${tokenImages[token.name]}`}></img>
                                <div>{token.name}</div>
                            </div>
                            <div className="splash-col-2">{getTokenPrice(token.price)}</div>
                            {token.dailyChange >= 0 ? <div className="splash-cols green-font">{getDecimals(token.dailyChange)}%</div> : <div className="splash-cols red-font">{getDecimals(token.dailyChange)}%</div>}
                            <div className="splash-cols">{getTokenPrice(token.dailyVolume)}</div>
                            <div className="splash-cols flex-end">{getTokenPrice(token.marketCap)}</div>
                        </div>
                    )}
                </div>
            </div>



        </>


    )
}

export default Tokens;
