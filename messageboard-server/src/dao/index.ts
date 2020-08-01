import {Pool} from 'pg'

export const connectionPool:Pool = new Pool({
    host:process.env['MB_HOST'], // public ip of db instance
    user:process.env['MB_USER'],
    password:process.env['MB_PASSWORD'],
    database:process.env['MB_DATABASE'],
    port:5432, // standard db port
    max:5 // max # connections
})