import axios from "axios"
import {useAuthContext} from "../../context/auth-context";
import {useAsync} from "./useAsync";
import {refreshToken} from "../authProvider";


const API_URL = process.env.REACT_APP_API_URL

async function apiClient(endpoint, {method, body, token, pagination = false}) {
    const config = {
        url: !pagination ? `${API_URL}${endpoint}` : endpoint,
        method,
        data: JSON.stringify(body),
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            "Content-Type": body ? "application/json" : undefined,
        }
    }
    return axios(config)
}

function useApiClient() {
    const {setData} = useAsync()
    const {data: {access, refresh}} = useAuthContext()
    return (endpoint, config) => apiClient(endpoint, {...config, token: access})
        .catch((error) => {
            const {response: {data: {code}}} = error
            if (code === "token_not_valid") {
                refreshToken(refresh).then((res) => {
                    setData({access: res.data.access, refresh})
                    localStorage.setItem("__user_auth_tokens__", JSON.stringify({refresh, access: res.data.access}))
                    window.location.reload()
                })
            }
            return error
        })
}


export {useApiClient}