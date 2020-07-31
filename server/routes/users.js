const express = require("express");
const pool = require("../db");
const jwtGenerator = require("../utils/jwt");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

//register
userRouter.post("/register", async (req, res) => {
  const { userEmail, userPassword, firstName, lastName, house } = req.body;

  try {
    const user = await pool.query(
      "SELECT * FROM harrypotter.users u WHERE u.user_email = $1",
      [userEmail]
    );

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }
    const getInt = () => {
      return Math.floor(Math.random() * 4) + 1;
    };
    const getHouse = getInt();
    console.log(`this is: ${getHouse}`);

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(userPassword, salt);

    let newUser = await pool.query(
      "INSERT INTO harrypotter.users  ( user_email, user_password, first_name, last_name, house) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userEmail, bcryptPassword, firstName, lastName, getHouse]
    );
    // return res.send(newUser.rows[0]);

    const jwtToken = jwtGenerator(newUser.rows[0].user_id);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//login
userRouter.post("/login", async (req, res, next) => {
  const { userPassword, userEmail } = req.body;
  try {
    const user = await pool.query(
      "SELECT * FROM harrypotter.users u WHERE u.user_email = $1",
      [userEmail]
    );

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      userPassword,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json({ jwtToken });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

userRouter.get("/verify", auth, (req, res, next) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

userRouter.get("/:id", async (req, res, next) =>{
  let { id } = req.params;
  if(isNaN(+id)){
    res.status(400).send('Id should be a #')
  } else{
    try {
      const user = await pool.query(
        `select u.user_id, u.user_email from harrypotter.users u where u.user_id = ${id};`
      );
      return user.rows[0].user_email;
    } catch (error) {
      console.log('Error getting User by Id')
      res.status(500).send("Server error");
    }
  }
});

// userRouter.get("/allUsers", auth, (req, res, next) =>{

// });

module.exports = userRouter;
