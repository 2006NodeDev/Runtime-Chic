const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  host: process.env.RC_HOST,
  user: process.env.RC_USER,
  password: process.env.RC_PASSWORD,
  port: 5432,
  database: process.env.RC_DATABASE,
});

module.exports = pool;

// const pool = new Pool({
//   host:process.env['MB_HOST'], // public ip of db instance
//   user:process.env['MB_USER'],
//   password:process.env['MB_PASSWORD'],
//   port: 5432,
//   database: "postgres",
// });
