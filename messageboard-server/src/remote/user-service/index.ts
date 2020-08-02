import axios from 'axios'

// env for host address or localhost default
let baseURL = process.env['USER_SERVICE_HOST'] || 'http://localhost:3003';

export const userServiceBaseClient = axios.create({
    baseURL,
    headers:{
        'Content-Type':'application/json'
    }
})