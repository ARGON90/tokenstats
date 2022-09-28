import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserTradesThunk } from '../store/trades-store';
import CreateTradeModal from './CreateTradeModal';


function Trades() {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => (state?.session?.user))
    const userId = Number(currentUser.id)
    const allTrades = useSelector((state) => Object.values(state?.trades))
    const userTrades = allTrades.filter(trades => trades.user_id === userId)

    useEffect(() => {
        dispatch(getUserTradesThunk())
    }, [dispatch])

    // if (!userPortfolios) return (<div>No portfolfios</div>)
    return (
        <>
            <div>My Trades</div>
            {userTrades.map((trade) =>
                <div key={trade.id}>
                    <div>You traded {trade.amount_traded} {trade.token_name} at a price of {trade.trade_price} each</div>

                </div>
            )}
            <CreateTradeModal />

        </>
    )
}

export default Trades
