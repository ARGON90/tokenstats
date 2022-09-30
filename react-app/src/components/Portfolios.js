import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserPortfoliosThunk } from '../store/portfolio-store';
import CreatePortfolioModal from './CreatePortfolioModal';
import DeletePortfolioModal from './DeletePortfolioModal';
import EditPortfolioModal from './EditPortfolioModal';
import Trades from './Trades';
import Holdings from './Holdings';

function Portfolios() {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => (state?.session?.user))
    const allPortfolios = useSelector((state) => Object.values(state?.portfolios))

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
            <div>My Portfolios</div>
            <CreatePortfolioModal />
            <button value='all' onClick={updateCurrentPortfolio}>View All Portfolios</button>
            <div>
                {userPortfolios.map((portfolio) =>
                    <div key={portfolio.id} className='flex-row'>
                        <button value={portfolio.id} onClick={updateCurrentPortfolio}>{portfolio.name}</button>
                        <EditPortfolioModal portfolio={portfolio} />
                        <DeletePortfolioModal portfolio={portfolio} />
                    </div>
                )}
            </div>

            <br></br>

                <div>
                    <div>
                        <Trades portId={currentPortfolio}/>
                    </div>
                    <div>
                        <Holdings portId={currentPortfolio}/>
                    </div>
                </div>

        </>
    )
}

export default Portfolios
