import * as React from "react"
import * as auth from "../utils/authProvider"
import {useAsync} from "../utils/hooks/useAsync";
import {FullPageErrorFallback, FullPageSpinner} from "../components/lib";
import {useNavigate} from "react-router-dom";

const AuthContext = React.createContext()
AuthContext.displayName = "AuthContext"

function AuthProvider(props) {
    const navigate = useNavigate()
    const {data, status, error, isLoading, isError, isSuccess, isIdle, setData, setError} = useAsync()


    const login = (form) => auth.login(form)
        .then((res) => {
            setData(res.data)
            navigate("/books")
            localStorage.setItem("__user_auth_token__", res?.data.access)
            return res
        })


    const register = (form) => auth.register(form)
        .then((res) => {
            const {username, password} = form
            if (res.statusText === "OK") {
                login({username, password}).catch(setError)
            }
            return res
        })



    const logout = () => {
        auth.logOut()
        setData(null)
        window.location.href = "/"
    }


    const value = {
        data,
        login,
        register,
        logout
    }

    if (isLoading) {
        return <FullPageSpinner/>
    }

    return <AuthContext.Provider value={value} {...props}/>
}

function useAuthContext() {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error(`useAuthContext hook must be used within a AuthProvider Component`)
    }
    return context
}


export {AuthProvider, useAuthContext}