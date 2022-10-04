import { useSelector, useDispatch } from "react-redux"
import { Redirect } from "react-router-dom"
import { getAllTokensThunk, updateAllTokensThunk } from '../store/all-tokens-store';
import { useEffect, useState } from "react";
import SignUpForm from "./auth/SignUpForm";

function SplashPage() {
    const currentUser = useSelector(state => state?.session?.user)
    const allTokens = useSelector((state) => Object.values(state?.tokens))
    const dispatch = useDispatch()
    const [showSignup, setShowSignup] = useState(false)

    useEffect(() => {
        dispatch(getAllTokensThunk())
        // todo: comment in update AllTokens
        // dispatch(updateAllTokensThunk())
    }, [dispatch])

    const getDecimals = (num) => {
        let str = num.toString()
        let array = str.split('.')
        if (array[0].length > 3) {
            return array[0]
        } else {
            return num.toFixed(2)
        }
    }

    if (currentUser) {
        return <Redirect to='/home' />
    }

    function getTokenPrice(rawNum) {
        const prices = rawNum
        let localeString = prices.toLocaleString('usa-US', { style: 'currency', currency: 'USD' });
        return localeString
    }

    return (

        <>
            <div className='splash-page' >
                <div className="splash-header">Manage Your Crypto Portfolio in One Place!</div>

                <div className="splash-portfolio-div">
                    <div className="splash-item-portfolio-container" onClick={() => setShowSignup(!showSignup)}>
                        <div className="splash-portfolio">Create Your Portfolio!</div>
                    </div>
                    {showSignup &&
                        <div>
                            <SignUpForm />
                            <div className='signup-form-separator'></div>
                        </div>
                    }
                    <div className="splash-item-portfolio-container" onClick={() => setShowSignup(!showSignup)}>
                        <div className="splash-portfolio">Already a User? Login!</div>
                    </div>

                </div>

                <div className="splash-body">
                    <div className='splash-header-container'>
                        <div className='splash-col-1'>TOKEN</div>
                        <div className='splash-col-2'>PRICE</div>
                        <div className='splash-cols'>24H CHANGE</div>
                        <div className='splash-cols'>24H VOLUME</div>
                        <div className='splash-cols flex-end'>MARKET CAP</div>
                    </div>


                    {allTokens.map((token) =>
                        <div key={token.id} className='splash-individual-container'>
                            <div className="splash-col-1">{token.name}</div>
                            <div className="splash-col-2">{getTokenPrice(token.price)}</div>
                            {token.dailyChange >= 0 ? <div className="splash-cols green-font">{getDecimals(token.dailyChange)}%</div> : <div className="splash-cols red-font">{getDecimals(token.dailyChange)}%</div>}
                            <div className="splash-cols">{getTokenPrice(token.dailyVolume)}</div>
                            <div className="splash-cols flex-end">{getTokenPrice(token.marketCap)}</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default SplashPage
