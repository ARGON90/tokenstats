import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"

function SplashPage() {
    const currentUser = useSelector(state => state?.session?.user)

    if (currentUser) {
        return <Redirect to='/home' />
    }

    return (

        <>
            <h1>Splash Page</h1>
        </>
    )
}

export default SplashPage
