import {toast} from "react-toastify";

export function setNotification({data, success = false}) {
    return data && Object.values(data).map((message) => (
        success ? toast.success(typeof message === "string" ? message : message[0]):
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