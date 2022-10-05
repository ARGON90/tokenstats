import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Holdings from './Holdings';
import Trades from './Trades';
import Portfolios from './Portfolios';


function Tokens() {


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

    const allTokens = useSelector((state) => Object.values(state?.tokens))


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
                            <div className="splash-col-1">{token.name}</div>
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
