import axios from "axios"


const API_URL = process.env.REACT_APP_API_URL

async function apiClient(endpoint, {method, body, token}) {
    const config = {
        url: `${API_URL}${endpoint}`,
        method,
        data: JSON.stringify(body),
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            "Content-Type": body ? "application/json" : undefined,
            // 'Accept-Encoding': 'gzip, deflate',
            // Accept: "*/*"
        }
    }
    return axios(config)
}

export {apiClient}