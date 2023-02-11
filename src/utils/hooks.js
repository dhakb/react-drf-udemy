import * as React from "react"

function useSafeDispatch(dispatch) {
    const isMounted = React.useRef(false)

    React.useLayoutEffect(() => {
        isMounted.current = true
        return () => (isMounted.current = false)
    })
    return React.useCallback((...args) => (isMounted.current ? dispatch(...args) : void 0), [dispatch])
}

const token = localStorage.getItem("__user_auth_token__")
const defaultInitialState = {status: "idle", data: {access: token}, error: null}

function useAsync(initialState) {
    const initialStateRef = React.useRef({
        ...defaultInitialState,
        ...initialState
    })

    const [{status, data, error}, dispatch] = React.useReducer((a, b) => ({...a, ...b}), initialStateRef.current)
    const safeSetState = useSafeDispatch(dispatch)

    const setData = (data) => safeSetState({data, status: "resolved"})
    const setError = (error) => safeSetState({error, status: "rejected"})
    const reset = () => safeSetState(initialStateRef.current)

    const run = (promise) => {
        if (!promise || !promise.then) {
            throw new Error("Argument passed to useAsync().run() should be a promise!")
        }
        safeSetState({status: "pending"})

        return promise.then((res) => {
            setData(res.data)
            return res
        }).catch(error => {
            setError(error)
            return Promise.reject(error)
        })
    }


    return {
        isIdle: status === "idle",
        isLoading: status === "pending",
        isError: status === "rejected",
        isSuccess: status === "resolved",
        setData,
        setError,
        error,
        status,
        data,
        run,
        reset,
    }
}


export {useAsync}


