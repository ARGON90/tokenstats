import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserHoldingsThunk } from '../store/holdings-store';
import { getUserPortfoliosThunk } from '../store/portfolio-store';
import { getUserTradesThunk } from '../store/trades-store';


function Holdings() {
    const dispatch = useDispatch()
    const userHoldings = useSelector((state) => (state?.session?.user?.holdings))
    const userTrades = useSelector((state) => (state?.session?.user?.trades))

    useEffect(() => {
        dispatch(getUserHoldingsThunk())
    }, [dispatch])

    const currentUser = useSelector((state) => (state?.session?.user))
    if (!currentUser) {
        return <div>Loading Holdings</div>
    }


    let holdings = {}
    for (let i = 1; i <= userTrades.length; i++) {
        let tradesByToken = userTrades.filter((trade) => trade.token_id === i)

        // trades by token gives an array containing all of a token's trades
        console.log('trades by token', tradesByToken)

        // loop through each trade, add the amount traded to a total
        let amount_traded = 0;
        let totalCost = 0;
        for (let i = 0; i < tradesByToken.length; i++) {
            if (tradesByToken[i].buy === 'buy') {
                console.log('TRADE AMT', tradesByToken[i].amount_traded)
                amount_traded += tradesByToken[i].amount_traded
                totalCost += tradesByToken[i].total_cost
            }
            if (tradesByToken[i].buy === 'sell') {
                console.log('TRADE AMT', tradesByToken[i].amount_traded)
                amount_traded -= tradesByToken[i].amount_traded
                totalCost -= tradesByToken[i].total_cost
            }
            console.log('TRADESBYTOKEN!',tradesByToken[i].token_id)
            if (amount_traded) {
                holdings[tradesByToken[i].token_id] = {}
                holdings[tradesByToken[i].token_id].amount_traded = amount_traded
                // holdings[tradesByToken[i].token_id].amount_traded = amount_traded
                holdings[tradesByToken[i].token_id].totalCost = totalCost
                // [tradesByToken[i].token_id]: {
                //     tokenHoldings: total,
                //     totalCost: totalCost
                // }
            }
        }
    }



    console.log('HOLDINGS', holdings)
    // let holdingsArr = []
    // for (let key in holdings) {
    //     holdingsArr.push({ 'tokenId': Number(key), 'total': holdings[key] })
    // }
    // console.log(holdingsArr)



    // if (!userPortfolios) return (<div>No portfolfios</div>)
    return (
        <>
            <div>My Holdings</div>
            {userHoldings ? userHoldings.map((holding) =>
                <div key={holding.id}>
                    <div>{holding.token_amount} {holding.token_name}</div>

                </div>
            ) : <div>No holdings</div>}


        </>
    )
}

export default Holdings
