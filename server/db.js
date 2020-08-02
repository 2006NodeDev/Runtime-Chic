const Pool = require("pg").Pool;

const pool = new Pool({
  host: "34.86.156.67",
  user: "postgres",
  password: "password",
  port: 5432,
  database: "postgres",
});

module.exports = pool;