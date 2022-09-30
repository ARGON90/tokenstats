import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserTradesThunk } from '../store/trades-store';
import CreateTradeModal from './CreateTradeModal';
import EditTradeModal from './EditTradeModal';
import DeleteTradeModal from './DeleteTradeModal'
import AllTokens from './AllTokens';


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
    if (!userTrades) return <div>No Trades</div>
    return (
        <>
            <div>My Trades</div>
            {userTrades.map((trade) =>
                <div key={trade.id} className='flex-row'>
                    <div>You {boughtSold(trade.buy)} {trade.amount_traded} {getTokenName(trade.token_id)} at a price of ${trade.trade_price} each</div>
                    <EditTradeModal trade={trade}/>
                    <DeleteTradeModal trade={trade}/>
                </div>
            )}
            <CreateTradeModal />

        </>
    )
}

export default Trades
