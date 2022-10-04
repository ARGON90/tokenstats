import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserTradesThunk } from '../store/trades-store';
import EditTradeModal from './EditTradeModal';
import DeleteTradeModal from './DeleteTradeModal'

import './CSS/trades.css'
import './CSS/index.css'

function Trades({ portId, totalHoldingsVar, rerender, portfolios, setPortfolios }) {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => (state?.session?.user))
    const allTrades = useSelector((state) => Object.values(state?.trades))
    const allTokens = useSelector((state) => (state?.tokens))


    useEffect(() => {
        console.log('TRADE.JS - LINE 18')
        dispatch(getUserTradesThunk())
    }, [dispatch, portId, rerender, portfolios])

    console.log(rerender, 'RERENDER FROM TRAD.JS')

    if (!currentUser) {
        return <div>Loading Trades</div>
    }
    if (!allTokens[1]) {
        return <div>Loading Trades</div>
    }

    console.log(totalHoldingsVar)
    console.log(portId)
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
            const prices = [tradePL];
            let localeString = prices.toLocaleString('usa-US', { style: 'currency', currency: 'USD' });
            return localeString
            // return tradePL.toFixed(2)
        }

        const prices = [tradePL];
        let localeString = prices.toLocaleString('usa-US', { style: 'currency', currency: 'USD' });
        return localeString
        // return tradePL.toFixed(2)
    }

    if (!userTrades) return <div>No Trades</div>
    return (
        <>
            <div>

                <div className='trades-header-container'>
                    <div className='trade-col-1'>TYPE</div>
                    <div className='trade-col-2'>AMOUNT</div>
                    <div className='trade-cols'>TOKEN</div>
                    <div className='trade-cols'>TRADE COST</div>
                    <div className='trade-cols-5'>CURRENT VALUE</div>
                    <div className='trade-cols'>PROFIT/LOSS</div>
                    <div className='trade-cols'>EDIT/DELETE</div>
                </div>
                {userTrades.map((trade) =>
                    <div key={trade.id} className='trades-individual-container'>

                        <div className='trade-col-1'>{boughtSold(trade.buy)}</div>
                        <div className='trade-col-2'>{trade.amount_traded}</div>
                        <div className='trade-cols'>{getTokenName(trade.token_id)}</div>
                        <div className='trade-cols'>${(trade.total_cost).toFixed(0)}</div>
                        <div className='trade-cols-5'>${allTokens[trade.token_id].price.toFixed(0) * trade.amount_traded}</div>
                        { getPLTrade(trade) && getPLTrade(trade)[0] === '$' ? <div className='trade-cols-green'>{getPLTrade(trade)}</div> : <div className='trade-cols-red'>{getPLTrade(trade)}</div>}
                        <div className='image-cols'>
                            <EditTradeModal trade={trade} />
                            <DeleteTradeModal trade={trade} />
                        </div>

                    </div>
                )}

                <div>My Trades</div>
                {getTradesTotalProfit() && getTradesTotalProfit()[0] === '$' ? <div className='green-font'>Total Profit: {getTradesTotalProfit()}</div> : <div className='red-font'>Total Profit: {getTradesTotalProfit()}</div>}
            </div>
        </>
    )
}

export default Trades
