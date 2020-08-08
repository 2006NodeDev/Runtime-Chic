const jwt = require("jsonwebtoken");

function jwtGenerator(user_id) {
  console.log('in the generator')
  const payload = {
    user: user_id,
  };
  return jwt.sign(payload, "Cat123", { expiresIn: "1h" });
}

module.exports = jwtGenerator;
