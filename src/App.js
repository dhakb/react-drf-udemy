import * as React from "react"

import {FullPageSpinner} from "./components/lib";
import {useAuthContext} from "./context/auth-context";

const UnauthenticatedApp = React.lazy(() => import("./unauthenticated-app"))

function App() {
    const {data} = useAuthContext()
    console.log("auth_ctx>>>", data)


    return (
        <React.Suspense fallback={<FullPageSpinner/>}>
            <UnauthenticatedApp/>
        </React.Suspense>
    );
}

export default App;

