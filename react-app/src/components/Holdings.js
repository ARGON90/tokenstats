import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserHoldingsThunk } from '../store/holdings-store';
import { getUserTradesThunk } from '../store/trades-store';

import './CSS/holdings.css'

function Holdings({ portId, sortedHoldingsArray }) {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => (state?.session?.user))
    const allTrades = useSelector((state) => Object.values(state?.trades))
    const allTokens = useSelector((state) => (state?.tokens))
    const userId = Number(currentUser.id)


    // for some reason, accessing through users.trades causes render issue. need to dispatch users?
    // const userTrades = useSelector((state) => (state?.session?.user?.trades))

    useEffect(() => {
        dispatch(getUserHoldingsThunk())
        dispatch(getUserTradesThunk())
    }, [dispatch, portId])

    let userTrad = allTrades.filter(trade => trade?.user_id === userId)

    // console.log(userTrad, 'userTrad in holdings')
    if (portId === 'all') {
        // console.log(userTrad, 'user Trad by ALL trad 31')
    } else {
        // console.log('PORTID', portId)
        userTrad = allTrades.filter(trade => trade?.portfolio_id === Number(portId))
        // console.log(userTrad, 'user Trad by portfolio number - 33', portId)
    }

    if (!allTokens[1]) return null

    // console.log(userTrad.length, 'USER TRAD LENGTH - 39')
    let holdings = {}
    for (let i = 1; i <= 51; i++) {
        let tradesByToken = userTrad.filter((trade) => trade.token_id === i)

        // trades by token gives an array containing all of a token's trades
        // loop through each trade, add the amount traded to a total
        let amount_traded = 0;
        let totalCost = 0;
        for (let i = 0; i < tradesByToken.length; i++) {
            // console.log(tradesByToken, 'TRADES BY TOKEN - 47')
            if (tradesByToken[i].buy === 'buy') {
                amount_traded += tradesByToken[i].amount_traded
                totalCost += tradesByToken[i].total_cost
            }
            if (tradesByToken[i].buy === 'sell') {
                amount_traded -= tradesByToken[i].amount_traded
                totalCost -= tradesByToken[i].total_cost
            }
            holdings[tradesByToken[i].token_id] = {}
            holdings[tradesByToken[i].token_id].amount_traded = amount_traded
            holdings[tradesByToken[i].token_id].totalCost = totalCost
            holdings[tradesByToken[i].token_id].tokenId = tradesByToken[i].token_id
            holdings[tradesByToken[i].token_id].totalValue = amount_traded * allTokens[tradesByToken[i].token_id].price
            holdings[tradesByToken[i].token_id].totalValue24hAgo = (amount_traded * allTokens[tradesByToken[i].token_id].price) - amount_traded * allTokens[tradesByToken[i].token_id].price * (allTokens[tradesByToken[i].token_id].dailyChange / 100)
        }
    }
    // console.log(holdings, 'HOLDINGS - 67')
    // result is a nested object, need to convert this into a price-sorted array
    let holdingsArray = Object.values(holdings)
    // console.log(holdingsArray.length, 'holdingsArray length - 70')
    sortedHoldingsArray = []
    for (let j = holdingsArray.length - 1; j >= 0; j--) {
        let maxIndex;
        let max = 0;
        for (let i = holdingsArray.length - 1; i >= 0; i--) {
            if (holdingsArray[i].totalValue > max) {
                max = holdingsArray[i].totalValue;
                maxIndex = i;
            }
        }
        sortedHoldingsArray.push(holdingsArray.splice(maxIndex, 1))
    }
    console.log(sortedHoldingsArray, 'holdingsArray length - 70')
    for (let i =  sortedHoldingsArray.length - 1; i >= 0; i --) {
        console.log(sortedHoldingsArray[i], 'INDEX I')
        if (sortedHoldingsArray[i][0].amount_traded === 0) {
            sortedHoldingsArray.splice([i], 1)
            console.log(sortedHoldingsArray.splice([i], 1), 'SPLICE')
        }
    }

    if (!currentUser) {
        return <div>Loading Holdings</div>
    }


    function getTokenPrice(rawNum) {
        const prices = rawNum
        let localeString = prices.toLocaleString('usa-US', { style: 'currency', currency: 'USD' });
        return localeString
    }

    function getTokenHoldingValue(quant, price) {
        const prices = quant * price
        let localeString = prices.toLocaleString('usa-US', { style: 'currency', currency: 'USD' });
        return localeString
    }

    function getToken24HPL(rawNum) {
        const prices = rawNum
        let localeString = prices.toLocaleString('usa-US', { style: 'currency', currency: 'USD' });
        return localeString
    }

    return (
        <>
            <div className='holdings-page'>

                <div className='holdings-header-container'>
                    <div className='items-col-1'>NAME</div>
                    <div className='items-col-2'>AMOUNT</div>
                    <div className='reg-cols'>PRICE</div>
                    <div className='reg-cols'>24H CHANGE</div>
                    <div className='reg-cols'>TOTAL</div>
                    <div className='reg-cols flex-end'>24 HOUR P/L</div>
                </div>

                {sortedHoldingsArray.length ? sortedHoldingsArray.map((holding, idx) =>
                    <div key={idx} className='holdings-individual-container'>
                        <div className='items-col-1'>{allTokens[holding[0].tokenId].name}</div>
                        <div className='items-col-2'>{holding[0].amount_traded.toFixed(2)} </div>
                        <div className='reg-cols'>{getTokenPrice(allTokens[holding[0].tokenId].price)}</div>
                        {allTokens[holding[0].tokenId].dailyChange >= 0 ? <div className='reg-cols green-font'>+{allTokens[holding[0].tokenId].dailyChange.toFixed(2)}%</div> : <div className='reg-cols red-font'>{allTokens[holding[0].tokenId].dailyChange.toFixed(2)}%</div>}
                        <div className='reg-cols'>{getTokenHoldingValue(holding[0].amount_traded, allTokens[holding[0].tokenId].price)}</div>
                        {(holding[0].amount_traded * allTokens[holding[0].tokenId].price * allTokens[holding[0].tokenId].dailyChange / 100) >= 0 ? <div className='reg-cols flex-end green-font'>{getToken24HPL(holding[0].amount_traded * allTokens[holding[0].tokenId].price * allTokens[holding[0].tokenId].dailyChange / 100)}</div> : <div className='reg-cols flex-end red-font'>{getToken24HPL(holding[0].amount_traded * allTokens[holding[0].tokenId].price * allTokens[holding[0].tokenId].dailyChange / 100)}</div>}
                    </div>
                    // {style={{ color: negativeNum ? red : green }}}
                    // className={ negativeNum ? 'red' : 'green' }
                ) : <div>You have no Holdings. Please click "Add a Transaction" to add to your holdings.</div>}
            </div>
        </>
    )

}

export default Holdings
