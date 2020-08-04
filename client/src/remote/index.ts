import axios from 'axios'

// env for host address or localhost default
let rcBaseUrl = process.env['USER_SERVICE_HOST'] || 'http://localhost:3003'
let mbBaseUrl = process.env['MESSAGEBOARD_SERVICE_HOST'] || 'http://localhost:2007';

export const service = axios.create({
    baseURL: mbBaseUrl,
    headers:{
        'Content-Type':'application/json'
    }
})

export const liveyourtruthClient = axios.create({
  baseURL: rcBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
