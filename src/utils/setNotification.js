import {toast} from "react-toastify";

function setNotification({data}) {
    return data && Object.values(data).map((message) => (
         toast.error(typeof message === "string" ? message : message[0])
    ))
}

export {setNotification}
