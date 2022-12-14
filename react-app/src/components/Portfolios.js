import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPortfoliosThunk } from '../store/portfolio-store';
import { updateAllTokensThunk } from '../store/all-tokens-store';
import CreateTradeModal from './CreateTradeModal';
import CreatePortfolioModal from './CreatePortfolioModal';
import DeletePortfolioModal from './DeletePortfolioModal';
import EditPortfolioModal from './EditPortfolioModal';
import Trades from './Trades';
import Holdings from './Holdings';
import RefreshButton from './TestButton';

import './CSS/portfolios.css'

function Portfolios() {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => (state?.session?.user))
    const allPortfolios = useSelector((state) => Object.values(state?.portfolios))
    const allTrades = useSelector((state) => Object.values(state?.trades))
    const allTokens = useSelector((state) => (state?.tokens))

    const portfoliosObj = {}
    allPortfolios.forEach((portfolio) => portfoliosObj[portfolio.id] = portfolio)

    const [rerender, setRerender] = useState(false)
    const [displayTab, setDisplayTab] = useState('holdings')
    const [portfolios, setPortfolios] = useState(portfoliosObj)
    const [currentPortfolio, setCurrentPortfolio] = useState("all")


    console.log('PORTFOLIO.JS - CURRENT PORTFOLIO USESTATE - LINE 24 : ', currentPortfolio)
    let sortedHoldingsArray;
    useEffect(() => {
        dispatch(getUserPortfoliosThunk())
        console.log('USE EFFECT PORTFOLIOS.JS')
    }, [dispatch, displayTab, currentPortfolio, rerender, sortedHoldingsArray])

    if (!allTokens[1]) return null
    if (!currentUser) return null

    //BEGIN CALCULATE TOTALS BLOCK
    const userId = Number(currentUser.id)
    let userTrad = allTrades.filter(trade => trade?.user_id === userId)
    let portId = currentPortfolio
    if (portId === 'all') {
    } else {
        userTrad = allTrades.filter(trade => trade?.portfolio_id === Number(portId))
    }

    let holdings = {}
    for (let i = 1; i <= 51; i++) {
        let tradesByToken = userTrad.filter((trade) => trade.token_id === i)
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
            holdings[tradesByToken[i].token_id] = {}
            holdings[tradesByToken[i].token_id].amount_traded = amount_traded
            holdings[tradesByToken[i].token_id].totalCost = totalCost
            holdings[tradesByToken[i].token_id].tokenId = tradesByToken[i].token_id
            holdings[tradesByToken[i].token_id].totalValue = amount_traded * allTokens[tradesByToken[i].token_id].price
            holdings[tradesByToken[i].token_id].totalValue24hAgo = (amount_traded * allTokens[tradesByToken[i].token_id].price) - amount_traded * allTokens[tradesByToken[i].token_id].price * (allTokens[tradesByToken[i].token_id].dailyChange / 100)
        }
    }

    let holdingsArray = Object.values(holdings)
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

    function getTotalHoldingsValue() {
        let total = 0;
        sortedHoldingsArray.map((holding) =>
            total += (allTokens[holding[0].tokenId].price * holding[0].amount_traded)
        )
        const prices = [total];
        let localeString = prices.toLocaleString('usa-US', { style: 'currency', currency: 'USD' });
        return localeString
    }

    function getTotalHoldingsPercentChange() {
        let total = 0;
        sortedHoldingsArray.map((holding) =>
            total += (allTokens[holding[0].tokenId].price * holding[0].amount_traded)
        )
        let total24hAgo = 0

        sortedHoldingsArray.map((holding) =>
            total24hAgo += (allTokens[holding[0].tokenId].price * holding[0].amount_traded + (allTokens[holding[0].tokenId].price * holding[0].amount_traded * (allTokens[holding[0].tokenId].dailyChange / 100)))
        )
        let percentChange = ((total24hAgo - total) / total) * 100

        if (percentChange >= 0) {
            return `+${percentChange.toFixed(2)}`
        }
        if (percentChange < 0) {
            return `${percentChange.toFixed(2)}`
        }
    }

    // let totalh = getTotalHoldingsPercentChange()
    // if (!totalh) {
    //     return null
    // }


    function getTotal24HPL() {
        let total = 0;
        sortedHoldingsArray.map((holding) =>
            total += (allTokens[holding[0].tokenId].price * holding[0].amount_traded)
        )

        let total24hAgo = 0
        sortedHoldingsArray.map((holding) =>
            total24hAgo += (allTokens[holding[0].tokenId].price * holding[0].amount_traded + (allTokens[holding[0].tokenId].price * holding[0].amount_traded * (allTokens[holding[0].tokenId].dailyChange / 100)))
        )
        let percentChange = ((total24hAgo - total) / total) * 100

        const prices = (total * (percentChange / 100))

        if (prices < 0) {
            let localeString = prices.toLocaleString('usa-US', { style: 'currency', currency: 'USD' });
            return `${localeString}`
        }
        if (prices >= 0) {
            let localeString = prices.toLocaleString('usa-US', { style: 'currency', currency: 'USD' });
            return `${localeString}`
        }
    }
    //END CALCULATE TOTALS BLOCK



    if (!currentUser) {
        return <div>Loading Portfolios</div>
    }

    function holdingsClicked() {
        if (displayTab === 'holdings') {
            return 'portfolios-header-clicked'
        }
        return 'portfolios-header-unclicked'
    }

    function tradesClicked() {
        if (displayTab === 'trades') {
            return 'portfolios-header-clicked'
        }
        return 'portfolios-header-unclicked'
    }

    function allAssetsClicked() {
        if (currentPortfolio === 'all') {
            return 'portfolios-buttons-clicked'
        }
        return 'portfolios-buttons'
    }

    function portfolioButtonClicked(id) {
        if (Number(currentPortfolio) === id) {
            document.getElementById(id).className = "portfolios-buttons-clicked"
        } else {
            return 'portfolios-buttons'
        }
    }

    function refreshPrice() {
        dispatch(updateAllTokensThunk())
    }

    const userPortfolios = allPortfolios.filter(portfolio => portfolio.user_id === userId)

    return (
        <>
            <div className='portfolios-page'>
                <div className='portfolios-left-container'>
                    <div className='portfolio-create-div'>
                        <CreatePortfolioModal />
                    </div>
                    <div className='portfolio-assets-container'>
                        <div className={allAssetsClicked()} >
                            <div className='briefcase'>
                                <ion-icon name="briefcase"></ion-icon>
                            </div>
                            <button className='portfolio-all-assets' value='all' onClick={() => setCurrentPortfolio('all')}>All Assets</button>
                        </div>
                    </div>
                    <div>
                        {userPortfolios.length ? userPortfolios.map((portfolio) =>
                            <div key={portfolio.id} className='portfolios-buttons-container'>
                                <div className='portfolio-selection'>

                                    <button id={portfolio.id} className={portfolioButtonClicked(portfolio.id)} style={{ 'font-size': '16px' }} value={portfolio.id} onClick={() => setCurrentPortfolio(portfolio.id)}>{portfolio.name}</button>

                                </div>
                                <div className='portfolios-edit-delete-buttons'>
                                    <EditPortfolioModal portfolio={portfolio} />
                                    <DeletePortfolioModal setPortfolios={setPortfolios} portfolios={portfolios} portfolio={portfolio} rerender={rerender} setRerender={setRerender} holdVal={getTotalHoldingsValue} setCurrentPortfolio={setCurrentPortfolio} />
                                </div>
                            </div>
                        )
                            :
                            <div className='no-portfolios-container'>
                                <div className='no-portfolios-text'>Click "Create a Portfolio" to get started!</div>
                            </div>}
                    </div>
                </div>


                <div className='portfolios-right-container'>
                    <div className='holdings-totals-container'>
                        <div className='total-holdings'>
                            <div >{getTotalHoldingsValue()}</div>
                            <div className="" onClick={() => refreshPrice()}>
                                <RefreshButton />
                                {/* <ion-icon name="refresh-outline" ></ion-icon> */}
                            </div>
                        </div>
                        <div className='holdings-PL-container'>
                            {getTotal24HPL() && getTotal24HPL()[0] === '$' ? <div className='green-font'>{getTotal24HPL()}</div> : <div className='red-font padding-right-8px'>{getTotal24HPL()}</div>}
                            {getTotal24HPL() && getTotalHoldingsPercentChange()[0] === '+' ? <div className='green-font'>{getTotalHoldingsPercentChange()}%</div> : <div className='red-font'>{getTotalHoldingsPercentChange()}%</div>}
                            <div className='grey-font'>24H</div>
                        </div>
                    </div>

                    <div className='portfolios-right-header-container'>
                        <div className='holdings-trades-header'>
                            <div className={holdingsClicked()} onClick={() => setDisplayTab('holdings')}>HOLDINGS</div>
                            <div className={tradesClicked()} onClick={() => setDisplayTab('trades')}>TRADES</div>
                        </div>
                        <div className='holdings-trades-header-add-txn'>
                            <CreateTradeModal userPortfolios={userPortfolios} />
                            {/* <div className=''>hi</div> */}
                        </div>
                    </div>

                    {displayTab === 'holdings' &&
                        <div>
                            <Holdings portId={currentPortfolio} sortedHoldingsArray={sortedHoldingsArray} />
                        </div>}
                    {displayTab === 'trades' &&
                        <div>
                            <Trades portfolios={portfolios} setPortfolios={setPortfolios} portId={currentPortfolio} rerender={rerender} />
                        </div>}

                </div>
            </div>

        </>
    )
}

export default Portfolios
