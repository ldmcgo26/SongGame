import axios from 'axios'

let token = undefined
let timestamp = undefined

const refreshAccessToken = async () => {
    await axios
        .get('https://cptm91ekpj.execute-api.us-east-1.amazonaws.com/dev/callback/refresh-token')
        .then((res) => {
            token = res.data.access_token
        })
        .catch((error) => {
            console.error(error, 'Error refreshing token')
        })
}

export const getAccessToken = async () => {
    if (!token) {
        await axios
            .get('https://cptm91ekpj.execute-api.us-east-1.amazonaws.com/dev/callback/token')
            .then((res) => {
                token = res.data.access_token
                timestamp = Date.now()
            })
            .catch((error) => {
                console.error(error, 'Error getting access token')
            })
    } else if (Date.now() - timestamp > 3600 * 1000) {
        console.warn('Access token has expired, refreshing...')
        await refreshAccessToken()
    }
    return token
}

export const logout = async () => {
    token = undefined
    timestamp = undefined
    location.replace('https://main.d1zgindv5gtck4.amplifyapp.com/')
}
