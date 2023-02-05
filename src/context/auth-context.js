/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from "react"
import * as auth from "../utils/auth-provider"
import {useAsync} from "../utils/hooks";
import {FullPageErrorFallback} from "../components/lib";

const AuthContext = React.createContext(null)
AuthContext.displayName = "AuthContext"

function AuthProvider(props) {
    const {data, status, error, isLoading, isError, isSuccess, isIdle, setData} = useAsync()
    // console.log({
    //     data,
    //     isIdle,
    //     isLoading,
    //     isSuccess,
    //     status
    // })


    const login = (form) => auth.login(form).then((res) => {
        setData(res.data)
        localStorage.setItem("__user_auth_token__", res?.data.access)
    })
    const register = (form) => auth.register(form).then((res) => {
        setData(res.data)
        localStorage.setItem("__user_auth_token__", res?.data.access)
    })
    const logout = () => {
        setData(null)
        localStorage.clear()
        window.location.href = "/"
    }


    const value = {
        data,
        login,
        register,
        logout
    }

    // if (isLoading || isIdle) {
    //     return <FullPageSpinner/>
    // }

    if (isError) {
        return <FullPageErrorFallback error={error}/>
    }

    // if (isSuccess) {
    return <AuthContext.Provider value={value} {...props}/>
    // }

    // throw new Error(`Unhandled status: ${status}`)
}

function useAuthContext() {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error(`useAuth must be used within a AuthProvider`)
    }
    return context
}


export {AuthProvider, useAuthContext}