import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserHoldingsThunk } from '../store/holdings-store';
import { getUserTradesThunk } from '../store/trades-store';
import { tokensObj } from './zTokensList'



function Holdings() {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => (state?.session?.user))
    const allTrades = useSelector((state) => Object.values(state?.trades))
    // for some reason, accessing through users.trades causes render issue. need to dispatch users?
    const userId = Number(currentUser.id)
    const userTrad = allTrades.filter(trade => trade?.user_id === userId)
    const allTokens = useSelector((state) => (state?.tokens))

    const userTrades = useSelector((state) => (state?.session?.user?.trades))

    useEffect(() => {
        dispatch(getUserHoldingsThunk())
        dispatch(getUserTradesThunk())
    }, [dispatch])

    if(!allTokens[1]) return null

    let holdings = {}
    for (let i = 1; i <= userTrad.length; i++) {
        let tradesByToken = userTrad.filter((trade) => trade.token_id === i)

        // trades by token gives an array containing all of a token's trades
        // loop through each trade, add the amount traded to a total
        let amount_traded = 0;
        let totalCost = 0;
        for (let i = 0; i < tradesByToken.length; i++) {
            if (tradesByToken[i].buy === 'buy') {
                amount_traded += tradesByToken[i].amount_traded
                totalCost += tradesByToken[i].total_cost
            }
            if (tradesByToken[i].buy === 'sell') {
                amount_traded -= tradesByToken[i].amount_traded
                totalCost -= tradesByToken[i].total_cost
            }
            if (amount_traded) {
                holdings[tradesByToken[i].token_id] = {}
                holdings[tradesByToken[i].token_id].amount_traded = amount_traded
                holdings[tradesByToken[i].token_id].totalCost = totalCost
                holdings[tradesByToken[i].token_id].tokenId = tradesByToken[i].token_id
                holdings[tradesByToken[i].token_id].totalValue = amount_traded * allTokens[tradesByToken[i].token_id].price
                holdings[tradesByToken[i].token_id].totalValue24hAgo = (amount_traded * allTokens[tradesByToken[i].token_id].price) - amount_traded * allTokens[tradesByToken[i].token_id].price * (allTokens[tradesByToken[i].token_id].dailyChange / 100)
            }
        }
    }
    // result is a nested object, need to convert this into a price-sorted array
    let holdingsArray = Object.values(holdings)
    let sortedHoldingsArray = []
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
    console.log(sortedHoldingsArray, 'SRTHLDINGSARRAY')



    if (!currentUser) {
        return <div>Loading Holdings</div>
    }

    function getTokenHoldingValue(quant, price) {
        return (quant * price).toFixed(2)
    }

    function getTotalHoldingsValue() {
        let total = 0;
        sortedHoldingsArray.map((holding) =>
        total += (allTokens[holding[0].tokenId].price * holding[0].amount_traded)
        )
        return total.toFixed(0)

    }
    function getTotalHoldingsPercentChange() {
        let total = 0;
        sortedHoldingsArray.map((holding) =>
        total += (allTokens[holding[0].tokenId].price * holding[0].amount_traded)
        )
        let total24hAgo = 0
        sortedHoldingsArray.map((holding) =>
        total24hAgo += (allTokens[holding[0].tokenId].price * holding[0].amount_traded + (allTokens[holding[0].tokenId].price * holding[0].amount_traded * (allTokens[holding[0].tokenId].dailyChange / 100)) )
        )
        console.log(total, total24hAgo, 'CHANGE??')
        // percent change
        let percentChange = ((total24hAgo - total) / total ) * 100
        if (percentChange >= 0) {
            return `+${percentChange.toFixed(2)}`
        }
        if (percentChange >= 0) {
            return `-${percentChange.toFixed(2)}`
        }

    }


    return (
        <>
            <div>My Total Holdings: ${getTotalHoldingsValue()}, change of {getTotalHoldingsPercentChange()}%</div>

            {sortedHoldingsArray ? sortedHoldingsArray.map((holding) =>
                <div key={holding[0].totalCost} className='flex-row col-gap-5'>
                    <div>{holding[0].amount_traded} </div>
                    {/* <div>You Paid {holding[0].totalCost}</div> */}
                    <div> {tokensObj[holding[0].tokenId]} @ price {allTokens[holding[0].tokenId].price}</div>
                    <div>, worth ${getTokenHoldingValue(holding[0].amount_traded, allTokens[holding[0].tokenId].price)}</div>
                    <div>| change from yesterday is {allTokens[holding[0].tokenId].dailyChange.toFixed(2)}% |</div>
                    <div>24H P/L is ${(allTokens[holding[0].tokenId].price * allTokens[holding[0].tokenId].dailyChange / 100).toFixed(2)}</div>
                </div>
            ) : <div>No holdings</div>}

        </>
    )
}

export default Holdings
