import * as React from "react"

import {FullPageSpinner} from "./components/lib";
import {useAuthContext} from "./context/auth-context";
import {ToastContainer} from "react-toastify";
import {Navigate, useLocation} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const UnauthenticatedApp = React.lazy(() => import("./unauthenticated-app"))
const AuthenticatedApp = React.lazy(() => import("./authenticated-app"))


function App() {
    const {data: user} = useAuthContext()
    const [isUser, setIsUser] = React.useState(false)
    const urlPathLocation = useLocation()


    React.useEffect(() => {
        const user_token = localStorage.getItem("__user_auth_token__")

        if(user_token !== "undefined" && typeof user_token === "string") {
            setIsUser(true)
        } else {
            setIsUser(false)
        }
    }, [user, isUser])


    if(urlPathLocation.pathname === "/") {
        return  <Navigate to={"/books"} />
    }

    return (
        <React.Suspense fallback={<FullPageSpinner/>}>
            <ToastContainer position="top-right"
                            autoClose={5000}
                            hideProgressBar={true}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"/>
            {
                isUser ? <AuthenticatedApp/> : <UnauthenticatedApp/>
            }
        </React.Suspense>
    );
}

export default App;

