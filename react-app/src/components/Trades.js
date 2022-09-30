import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserTradesThunk } from '../store/trades-store';
import CreateTradeModal from './CreateTradeModal';
import EditTradeModal from './EditTradeModal';
import DeleteTradeModal from './DeleteTradeModal'



function Trades() {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => (state?.session?.user))
    const allTrades = useSelector((state) => Object.values(state?.trades))
    const allTokens = useSelector((state) => (state?.tokens))

    useEffect(() => {
        dispatch(getUserTradesThunk())
    }, [dispatch])


    if (!currentUser) {
        return <div>Loading Trades</div>
    }
    if (!allTokens[1]) {
        return <div>Loading Trades</div>
    }

    const userId = Number(currentUser.id)
    const userTrades = allTrades.filter(trades => trades?.user_id === userId)

    function boughtSold(buy) {
        if (buy === 'buy') {
            return 'bought'
        }

        if (buy === 'sell') {
            return 'sold'
        }
    }

    function getTokenName(id) {
        if (!allTokens[id]) {return <div>Loading</div>}
        return allTokens[id].name
    }
    function getTradesTotalProfit() {
        let totalProfit = 0;
        userTrades.map((trade) => {
            totalProfit += ( allTokens[trade.token_id].price * trade.amount_traded - trade.total_cost)
        })
        return `$${totalProfit.toFixed(2)}`
    }
    function getPLTrade(trade) {
        let tradePL = (allTokens[trade.token_id].price * trade.amount_traded) - (trade.total_cost)
        if (tradePL > 0 ) {
            return `+${tradePL.toFixed(2)}`
        }
        return tradePL.toFixed(2)
    }

    if (!userTrades) return <div>No Trades</div>
    return (
        <>
            <div>My Trades</div>
            <div>Total Profit: {getTradesTotalProfit()}</div>
            {userTrades.map((trade) =>
                <div key={trade.id} className='flex-row'>
                    <div>You {boughtSold(trade.buy)} {trade.amount_traded} {getTokenName(trade.token_id)} at of ${trade.trade_price} ea |</div>

                    <div>total cost: $ {(trade.total_cost).toFixed(0)} |</div>

                    <div>Total Worth = ${allTokens[trade.token_id].price.toFixed(0) * trade.amount_traded}</div>
                    <div>| P/L on this trade: {getPLTrade(trade)}</div>
                    <EditTradeModal trade={trade}/>
                    <DeleteTradeModal trade={trade}/>
                </div>
            )}
            <CreateTradeModal />

        </>
    )
}

export default Trades
