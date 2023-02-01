import * as React from "react"

import {FullPageSpinner} from "./components/lib";
import {useAuthContext} from "./context/auth-context";
import AuthenticatedApp from "./authenticated-app";

const UnauthenticatedApp = React.lazy(() => import("./unauthenticated-app"))

function App() {
    const {data: user} = useAuthContext()
    const [isUser, setIsUser] = React.useState(false)

    React.useEffect(() => {
        const user_token = localStorage.getItem("__user_auth_token__")

        if(user_token !== "undefined" && typeof user_token === "string") {
            setIsUser(true)
        } else {
            setIsUser(false)
        }
    }, [user, isUser])

    return (
        <React.Suspense fallback={<FullPageSpinner/>}>
            {
                isUser ? <AuthenticatedApp/> : <UnauthenticatedApp/>
            }
        </React.Suspense>
    );
}

export default App;

