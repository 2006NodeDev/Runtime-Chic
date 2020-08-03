const Pool = require("pg").Pool;

const pool = new Pool({
  host:process.env['MB_HOST'], // public ip of db instance
  user:process.env['MB_USER'],
  password:process.env['MB_PASSWORD'],
  port: 5432,
  database: "postgres",
});

module.exports = pool;
