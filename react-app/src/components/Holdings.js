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
        let tradesByToken = userTrades.filter((trade) => trade.token_id === i )
        console.log('trades by token', tradesByToken)
        let total = 0;
        for (let i = 0; i < tradesByToken.length; i++) {
            if (tradesByToken[i].buy ==='buy') {
                console.log('TRADE AMT', tradesByToken[i].amount_traded)
                total += tradesByToken[i].amount_traded
            }
            if (tradesByToken[i].buy ==='sell') {
                console.log('TRADE AMT', tradesByToken[i].amount_traded)
                total -= tradesByToken[i].amount_traded
            }
            console.log(total)
        }
    }




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
