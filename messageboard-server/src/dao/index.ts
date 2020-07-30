import {Pool} from 'pg'

export const connectionPool:Pool = new Pool ({
 host: '	env variable',
 user: 'env variable',
 password: 'env variable', 
 database: 'postgres',
 port: 5432, 
 max: 5
})