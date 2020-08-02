const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id) {
  console.log('in the generator')
  const payload = {
    user: user_id,
  };
  let secret = jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
  console.log(`secret: ${secret}`)
  return secret
}

module.exports = jwtGenerator;
