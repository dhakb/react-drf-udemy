import * as React from "react"

function useSafeDispatch(dispatch) {
    const isMounted = React.useRef(false)

    React.useLayoutEffect(() => {
        isMounted.current = true
        return () => (isMounted.current = false)
    })
    return React.useCallback((...args) => (isMounted.current ? dispatch(...args) : void 0), [dispatch])
}

const tokens = JSON.parse(localStorage.getItem("__user_auth_tokens__"))
const defaultInitialState = {status: "idle", data: {access: tokens?.access, refresh: tokens?.refresh}, error: null}

function useAsync(initialState) {
    const initialStateRef = React.useRef({
        ...defaultInitialState,
        ...initialState
    })

    const [{status, data, error}, dispatch] = React.useReducer((a, b) => ({...a, ...b}), initialStateRef.current)
    const safeSetState = useSafeDispatch(dispatch)
    const setData = (data) => safeSetState({data, status: "resolved"})
    const setError = (error) => safeSetState({error, status: "rejected"})
    const setStatus = (status) => safeSetState({status})
    const reset = () => safeSetState(initialStateRef.current)

    const run = React.useCallback((promise) => {
        if (!promise || !promise.then) {
            throw new Error("Argument passed to useAsync().run() must be a promise!")
        }
        safeSetState({status: "pending"})
        return promise.then((res) => {
            setData(res.data)
            return res
        }).catch(error => {
            setError(error)
            return Promise.reject(error)
        })
    }, [safeSetState])


    return {
        isIdle: status === "idle",
        isLoading: status === "pending",
        isError: status === "rejected",
        isSuccess: status === "resolved",
        setData,
        setError,
        setStatus,
        run,
        error,
        status,
        data,
        reset,
    }
}


export {useAsync}


