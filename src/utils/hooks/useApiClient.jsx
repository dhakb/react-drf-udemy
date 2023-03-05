import axios from "axios"
import {useAuthContext} from "../../context/auth-context";

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
    const {data: {access: token}} = useAuthContext()
    return (endpoint, config) => apiClient(endpoint, {...config, token})
}



export {useApiClient}