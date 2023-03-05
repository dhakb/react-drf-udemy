import * as React from "react"
import * as auth from "../utils/authProvider"
import {useAsync} from "../utils/hooks/useAsync";
import {FullPageSpinner} from "../components/lib";


const LOCALE_STORAGE_TOKEN_KEY = "__user_auth_tokens__"

const AuthContext = React.createContext()
AuthContext.displayName = "AuthContext"

function AuthContextProvider(props) {
    const {data, status, error, isLoading, isError, isSuccess, isIdle, setData, setError, reset} = useAsync()

    const login = (form) => auth.login(form)
        .then((res) => {
            setData(res.data)
            localStorage.setItem(LOCALE_STORAGE_TOKEN_KEY, JSON.stringify(res?.data))
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
        localStorage.removeItem(LOCALE_STORAGE_TOKEN_KEY)
        reset()
        window.location.replace("/")
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
        throw new Error(`useAuthContext hook must be used within a AuthContextProvider Component`)
    }
    return context
}


export {AuthContextProvider, useAuthContext}