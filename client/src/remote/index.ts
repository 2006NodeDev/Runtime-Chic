import axios from 'axios'

let mbBaseUrl = process.env['MESSAGEBOARD_SERVICE_HOST'] || 'http://localhost:2007';

export const service = axios.create({
    baseURL: mbBaseUrl,
    headers:{
        'Content-Type':'application/json',
        "jwt_token": localStorage.token
    },
})
