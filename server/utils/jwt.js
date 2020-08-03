const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id) {
  console.log('in the generator')
  const payload = {
    user: user_id,
  };
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

module.exports = jwtGenerator;
