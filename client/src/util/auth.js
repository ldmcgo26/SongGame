import axios from 'axios'

// On successful redirection, extract tokens from the URL
window.onload = function () {
    const hash = window.location.hash
    const tokenData = {}

    if (hash) {
        hash.substring(1)
            .split('&')
            .forEach((item) => {
                const [key, value] = item.split('=')
                tokenData[key] = value
            })

        if (tokenData.access_token) {
            window.localStorage.setItem('access_token', tokenData.access_token)
        }
        if (tokenData.refresh_token) {
            window.localStorage.setItem(
                'refresh_token',
                tokenData.refresh_token
            )
        }
        if (tokenData.timestamp) {
            window.localStorage.setItem('timestamp', tokenData.timestamp)
        }

        // Clear the URL hash
        window.location.hash = ''
    }
}

// Function to get access token
export async function getAccessToken() {
    const token = window.localStorage.getItem('access_token')
    const timestamp = window.localStorage.getItem('timestamp')
    const expirationDuration = 3600 * 1000 // 1 hour in milliseconds

    if (!token || !timestamp) {
        return null
    }

    const tokenAge = Date.now() - parseInt(timestamp, 10)
    if (tokenAge > expirationDuration) {
        // Token has expired, refresh it
        await refreshAccessToken()
    }

    return window.localStorage.getItem('access_token')
}

// Function to refresh access token
async function refreshAccessToken() {
    const refreshToken = window.localStorage.getItem('refresh_token')
    if (!refreshToken) {
        console.error('Refresh token not found')
        return
    }

    try {
        const response = await axios.get(
            'https://err9y13l2i.execute-api.us-east-1.amazonaws.com/dev/callback/refresh-token',
            { refresh_token: refreshToken }
        )
        const newAccessToken = response.data.access_token
        const newRefreshToken = response.data.refresh_token
        window.localStorage.setItem('access_token', newAccessToken)
        window.localStorage.setItem('refresh_token', newRefreshToken)
    } catch (error) {
        console.error('Error refreshing access token', error)
    }
}
