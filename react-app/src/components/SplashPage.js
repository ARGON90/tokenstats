import { useSelector } from "react-redux"
import { useHistory} from "react-router-dom"

function SplashPage() {
    const currentUser = useSelector(state => state?.session?.user)
    const history = useHistory()

    if (currentUser) {
        // <Redirect to='/home' />
       return history.push('/home')
    }

    return (

        <div>Splash Page</div>
    )

}

export default SplashPage
