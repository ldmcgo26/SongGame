import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://cptm91ekpj.execute-api.us-east-1.amazonaws.com/dev', // Replace with your API's base URL
    // You can add other default configurations here, such as headers
})

export default instance
