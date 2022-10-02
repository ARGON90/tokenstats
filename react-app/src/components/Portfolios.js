import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPortfoliosThunk } from '../store/portfolio-store';
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

    const [displayTab, setDisplayTab] = useState('holdings')
    const [currentPortfolio, setCurrentPortfolio] = useState("all")
    const updateCurrentPortfolio = (e) => setCurrentPortfolio(e.target.value);



    useEffect(() => {
        dispatch(getUserPortfoliosThunk())
    }, [dispatch])

    if (!currentUser) {
        return <div>Loading Portfolios</div>
    }



    const userId = Number(currentUser.id)
    const userPortfolios = allPortfolios.filter(portfolio => portfolio.user_id === userId)


    if (!userPortfolios) return (<div>No portfolfios</div>)
    return (
        <>
            <div className='portfolios-page'>

                <div className='portfolios-left-container'>
                    <CreatePortfolioModal />
                    <button value='all' onClick={updateCurrentPortfolio}>View All Assets</button>
                    <div>
                        {userPortfolios.map((portfolio) =>
                            <div key={portfolio.id} className='flex-row'>
                                <button value={portfolio.id} onClick={updateCurrentPortfolio}>{portfolio.name}</button>
                                <EditPortfolioModal portfolio={portfolio} />
                                <DeletePortfolioModal portfolio={portfolio} />
                            </div>
                        )}
                    </div>
                </div>


                <div className='portfolios-right-container'>
                    <div className='portfolios-right-header-container'>
                        <div onClick={() => setDisplayTab('holdings')}>HOLDINGS</div>
                        <div onClick={() => setDisplayTab('trades')}>TRADES</div>
                    </div>

                    {displayTab === 'holdings' &&
                        <div>
                            <Holdings portId={currentPortfolio} />
                        </div>}

                    {displayTab === 'trades' &&
                        <div>
                            <Trades portId={currentPortfolio} />
                        </div>}
                </div>
            </div>

        </>
    )
}

export default Portfolios
