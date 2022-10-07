import { useSelector, useDispatch } from "react-redux"
import { Redirect } from "react-router-dom"
import { getAllTokensThunk, updateAllTokensThunk } from '../store/all-tokens-store';
import { useEffect } from "react";
import SignUpForm from "./auth/SignUpForm";
import LoginForm from "./auth/LoginForm";
import { login } from "../store/session";

function SplashPage({ showSignup, setShowSignup }) {
    const currentUser = useSelector(state => state?.session?.user)
    const allTokens = useSelector((state) => Object.values(state?.tokens))
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllTokensThunk())
        // todo: comment in update AllTokens
        // dispatch(updateAllTokensThunk())
    }, [dispatch, showSignup])

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

    const demoLogin = async () => {
        dispatch(updateAllTokensThunk())
        await dispatch(login('demo@aa.io', 'password'));

    };

    return (
        <>
            <div className='splash-page' >
                <div className="splash-header">Manage Your Crypto Portfolio in One Place!</div>


                {/* SHOW ALL BUTTONS */}
                {showSignup === 'all' &&
                    <div className="splash-top">
                        <div className="splash-portfolio-div">
                            <div className="splash-item-portfolio-container" onClick={() => demoLogin()}>
                                <div className="splash-portfolio">Click here to try a Demo User!</div>
                            </div>

                            <div className="splash-item-portfolio-container" onClick={() => setShowSignup('sign-up')}>
                                <div className="splash-portfolio">New User? Sign up!</div>
                            </div>

                            <div className="splash-item-portfolio-container" onClick={() => setShowSignup('login')}>
                                <div className="splash-portfolio">Already a User? Log In!</div>
                            </div>
                        </div>
                        <div className="instructions-container">
                            <a className="splash-instructions" href='https://github.com/ARGON90/tokenstats/wiki/How-To-Use-TokenStats' target='_blank' rel='noreferrer'>Not sure where to Start? Click here!
                            </a>
                        </div>
                    </div>

                }

                {showSignup === 'sign-up' &&
                    <div className="signup-splash-top">
                        <div className="signup-splash-portfolio-div">


                            <div className="signup-splash-portfolio-clicked">Sign Up Here →</div>

                            <div>
                                <SignUpForm setShowSignup={setShowSignup} />
                            </div>
                        </div>
                    </div>

                }

                {showSignup === 'login' &&
                    <div className="signup-splash-top">
                        <div className="signup-splash-portfolio-div">

                            <div className="signup-splash-portfolio-clicked">Log In Here →</div>

                            <div >
                                <LoginForm setShowSignup={setShowSignup} />
                            </div>

                        </div>
                    </div>

                }


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
