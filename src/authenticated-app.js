import * as React from 'react';
import {useAuthContext} from "./context/auth-context";

function AuthenticatedApp(props) {
    const {logout} = useAuthContext()

    const logoutHandler = () => {
        logout()
    }


    return (
        <div>
            <h1>user is authenticated!!</h1>
            <button onClick={logoutHandler}>Logout</button>
        </div>
    );
}

export default AuthenticatedApp;