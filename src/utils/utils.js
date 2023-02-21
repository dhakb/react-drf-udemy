import {toast} from "react-toastify";


export function setNotification({data}) {
    return data && Object.values(data).map((message) => (
        toast.error(typeof message === "string" ? message : message[0])
    ))
}


export function debounce (callback, timeout = 1000) {
    let timer;
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback.apply(this, args)
        }, timeout)
    }
}