import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPortfoliosThunk } from '../store/portfolio-store';
import CreateTradeModal from './CreateTradeModal';
import CreatePortfolioModal from './CreatePortfolioModal';
import DeletePortfolioModal from './DeletePortfolioModal';
import EditPortfolioModal from './EditPortfolioModal';
import Trades from './Trades';
import Holdings from './Holdings';


import './CSS/portfolios.css'

function Portfolios() {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => (state?.session?.user))
    const allPortfolios = useSelector((state) => Object.values(state?.portfolios))

    const [total24HPLVar, setTotal24HPLVar] = useState('')
    const [totalPctChangeVar, setTotalPctChangeVar] = useState('')
    const [totalHoldingsVar, setTotalHoldingsVar] = useState('')
    const [displayTab, setDisplayTab] = useState('holdings')
    const [currentPortfolio, setCurrentPortfolio] = useState("all")
    const updateCurrentPortfolio = (e) => { setCurrentPortfolio(e.target.value) }



    useEffect(() => {
        dispatch(getUserPortfoliosThunk())
    }, [dispatch, displayTab, currentPortfolio])

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

    const userId = Number(currentUser.id)
    const userPortfolios = allPortfolios.filter(portfolio => portfolio.user_id === userId)

    if (!userPortfolios) return <div>No portfolfios</div>
    return (
        <>
            <div className='portfolios-page'>
                <div className='portfolios-left-container'>
                    <div className='portfolio-create-div'>
                        <CreatePortfolioModal />
                    </div>
                    <div className='portfolio-assets-container'>
                        <div className={allAssetsClicked()} >
                            <button className='portfolio-all-assets' value='all' onClick={updateCurrentPortfolio}>All Assets</button>
                        </div>
                    </div>
                    <div>
                        {userPortfolios.map((portfolio) =>
                            <div key={portfolio.id} className='portfolios-buttons-container'>
                                <div className='portfolio-selection'>
                                    <button id={portfolio.id} className={portfolioButtonClicked(portfolio.id)} value={portfolio.id} onClick={updateCurrentPortfolio}>{portfolio.name}</button>
                                </div>
                                <div className='portfolios-edit-delete-buttons'>
                                    <EditPortfolioModal portfolio={portfolio} />
                                    <DeletePortfolioModal portfolio={portfolio} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>


                <div className='portfolios-right-container'>
                    <div className='holdings-totals-container'>
                        <div className='total-holdings'>${totalHoldingsVar}</div>
                        <div className='holdings-PL-container'>
                            <div>${total24HPLVar}</div>
                            <div>{totalPctChangeVar}%</div>
                            <div className='grey-font'>24H</div>
                        </div>
                    </div>

                    <div className='portfolios-right-header-container'>
                        <div className='holdings-trades-header'>
                            <div className={holdingsClicked()} onClick={() => setDisplayTab('holdings')}>HOLDINGS</div>
                            <div className={tradesClicked()} onClick={() => setDisplayTab('trades')}>TRADES</div>
                        </div>
                        <div className='holdings-trades-header-add-txn'>
                            <CreateTradeModal />
                            {/* <div className=''>hi</div> */}
                        </div>
                    </div>

                    {displayTab === 'holdings' &&
                        <div>
                            <Holdings portId={currentPortfolio} setTotalHoldingsVar={setTotalHoldingsVar} setTotal24HPLVar={setTotal24HPLVar} setTotalPctChangeVar={setTotalPctChangeVar} />
                        </div>}
                    {displayTab === 'trades' &&
                        <div>
                            <Trades portId={currentPortfolio} totalHoldingsVar={totalHoldingsVar} />
                        </div>}

                </div>
            </div>

        </>
    )
}

export default Portfolios
