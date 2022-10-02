import { useSelector, useDispatch } from "react-redux"
import { Redirect } from "react-router-dom"
import { getAllTokensThunk, updateAllTokensThunk } from '../store/all-tokens-store';
import { useEffect } from "react";

function SplashPage() {
    const currentUser = useSelector(state => state?.session?.user)
    const allTokens = useSelector((state) => Object.values(state?.tokens))
    const dispatch = useDispatch()

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

    return (

        <>
            <h1>Manage Your Crypto Portfolio from One Place!</h1>
            {allTokens.map((token) =>
                <div key={token.id} className='flex-row col-gap-5'>
                    <div>{token.name}</div>
                    <div>${getDecimals(token.price)}</div>
                    <div>{getDecimals(token.dailyChange)}</div>
                    <div>{getDecimals(token.dailyVolume)}</div>
                    <div>{getDecimals(token.marketCap)}</div>
                </div>
            )}
        </>
    )
}

export default SplashPage
