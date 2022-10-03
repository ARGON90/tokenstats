import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserTradesThunk } from '../store/trades-store';
import CreateTradeModal from './CreateTradeModal';
import EditTradeModal from './EditTradeModal';
import DeleteTradeModal from './DeleteTradeModal'

import './CSS/trades.css'

function Trades({ portId }) {
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
    let userTrades = allTrades.filter(trades => trades?.user_id === userId)

    if (portId === 'all') {

    } else {
        userTrades = allTrades.filter(trade => trade?.portfolio_id === Number(portId))
    }




    function boughtSold(buy) {
        if (buy === 'buy') {
            return 'BUY'
        }

        if (buy === 'sell') {
            return 'SELL'
        }
    }

    function getTokenName(id) {
        if (!allTokens[id]) { return <div>Loading</div> }
        return allTokens[id].name
    }
    function getTradesTotalProfit() {
        let totalProfit = 0;
        userTrades.forEach((trade) => {
            totalProfit += (allTokens[trade.token_id].price * trade.amount_traded - trade.total_cost)
        })
        return `$${totalProfit.toFixed(2)}`
    }
    function getPLTrade(trade) {
        let tradePL = (allTokens[trade.token_id].price * trade.amount_traded) - (trade.total_cost)
        if (tradePL > 0) {
            return `+${tradePL.toFixed(2)}`
        }
        return tradePL.toFixed(2)
    }

    if (!userTrades) return <div>No Trades</div>
    return (
        <>
            <div>

                <div className='trades-header-container'>
                    <div className='items-col-1'>TYPE</div>
                    <div className='items-col-2'>AMOUNT</div>
                    <div className='reg-cols'>TOKEN </div>
                    <div className='reg-cols'>TRADE VALUE</div>
                    <div className='reg-cols'>CURRENT VALUE</div>
                    <div className='reg-cols flex-end'>PROFIT/LOSS</div>
                </div>
                {userTrades.map((trade) =>
                    <div key={trade.id} className='trades-individual-container'>

                        <div className='items-col-1'>{boughtSold(trade.buy)}</div>
                        <div className='items-col-2'>{trade.amount_traded}</div>
                        <div className='reg-cols'>{getTokenName(trade.token_id)}</div>
                        <div className='reg-cols'>${(trade.total_cost).toFixed(0)}</div>
                        <div className='reg-cols'>${allTokens[trade.token_id].price.toFixed(0) * trade.amount_traded}</div>
                        <div className='reg-cols'>{getPLTrade(trade)}</div>

                        {/* <div>${trade.trade_price} ea |</div> */}

                        <EditTradeModal trade={trade} />
                        <DeleteTradeModal trade={trade} />
                    </div>
                )}

                <div>My Trades</div>
                <div>Total Profit: {getTradesTotalProfit()}</div>
            </div>
        </>
    )
}

export default Trades
