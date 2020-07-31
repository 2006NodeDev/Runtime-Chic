import {Pool} from 'pg'

export const connectionPool:Pool = new Pool ({
 host: '34.86.141.95',
 user: 'postgres',
 password: 'NodeDev2006', 
 database: 'message-board',
 port: 5432, 
 max: 5
})