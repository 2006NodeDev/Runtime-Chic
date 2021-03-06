const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("jwt_token");
  console.log(token);
  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  // Verify token
  try {
    //it is going to give use the user id (user:{id: user.id})
    const verify = jwt.verify(token, process.env['jwtSecret']);

    req.user = verify.user;
    console.log(verify.user);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
