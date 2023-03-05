import * as React from "react"
import {FullPageSpinner} from "./components/lib";
import {useAuthContext} from "./context/auth-context";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UnauthenticatedApp = React.lazy(() => import("./unauthenticated-app"))
const AuthenticatedApp = React.lazy(() => import("./authenticated-app"))



function App() {
    const {data: user} = useAuthContext()


    return (
        <React.Suspense fallback={<FullPageSpinner/>}>
            <ToastContainer position="top-right"
                            autoClose={3000}
                            hideProgressBar={true}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"/>
            {
                user?.access ? <AuthenticatedApp/> : <UnauthenticatedApp/>
            }
        </React.Suspense>
    );
}

export default App;

