const Pool = require("pg").Pool;

const pool = new Pool({
  host: "34.86.141.95", // public ip of db instance
  user: "postgres",
  password: "NodeDev2006",
  database: "postgres",
  port: 5432,
});




module.exports = pool;

