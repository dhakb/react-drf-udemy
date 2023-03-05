import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL
const LOCALE_STORAGE_TOKEN_KEY = "__user_auth_token__"

async function client(endpoint, body) {
    const config = {
        url: `${API_URL}${endpoint}`,
        method: "POST",
        data: body,
        headers: {
            "Content-Type": "application/json",
        }
    }
    return axios(config)
}

// function handleAuthResponse({data: {access}}) {
//     console.log("from handler", access)
//     localStorage.setItem(LOCALE_STORAGE_TOKEN_KEY, access)
// }

function login({username, password}){
    return client("user/login/", {username, password})
}

function register({firstname, lastname, email, username, password, passwordConfirm}) {
    return client("user/register/", {first_name: firstname, last_name: lastname, email, username, password, password_repeat: passwordConfirm})
}

function refreshToken(token) {
    return client("user/token-refresh/", token)
}

function logOut() {
    localStorage.removeItem(LOCALE_STORAGE_TOKEN_KEY)
}

export {login, register, refreshToken, logOut}