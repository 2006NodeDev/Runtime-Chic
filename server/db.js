const Pool = require("pg").Pool;

const pool = new Pool({
  host: process.env['RC_HOST'], // public ip of db instance
  user: process.env['RC_USER'],
  password: process.env['RC_PASSWORD'],
  database: process.env['RC_DATABASE'],
  port: 5432,
});




module.exports = pool;

