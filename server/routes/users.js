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

    return res.json({ user: newUser.rows[0], token: { jwtToken } });
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
      `select u.user_id, u.user_email, u.user_password, u.first_name, u.last_name, u.house, u.profile, h.house_id, h.house_name from harrypotter.users u
      join harrypotter.house h on u.house = h.house_id WHERE u.user_email = $1;`,
      [userEmail]
    );

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }
    const validPassword = await bcrypt.compare(
      userPassword,
      user.rows[0].user_password
    );
    console.log(`in the login`);
    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    console.log(`we have a valid password`);
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    console.log(`we got a token: ${jwtToken}`);
    console.log(user.rows[0]);
    return res.json({ user: user.rows[0], token: { jwtToken } });
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

userRouter.get("/:id", async (req, res, next) => {
  let { id } = req.params;
  if (isNaN(+id)) {
    res.status(400).send("Id should be a #");
  } else {
    try {
      console.log(`user_id: ${id}`);
      let user = await pool.query(
        `select * from harrypotter.users u where u.user_id = ${id};` //
      );
      console.log(`user: ${user.rows[0].user_email}`);
      res.json(user.rows[0].user_email);
    } catch (error) {
      console.log("Error getting User by Id");
      res.status(500).send("Server error");
    }
  }
});

userRouter.get("/get/allUsers", async (req, res, next) => {
  try {
    const users = await pool.query(
      `select u.user_id, u.user_email, u.user_password, u.first_name, u.last_name, u.house, u.profile, h.house_id, h.house_name from harrypotter.users u
      join harrypotter.house h on u.house = h.house_id;`
    );
    if (users.rows.length === 0) {
      console.log(`users.rows.length === 0`);
    }
    res.json(users.rows);
  } catch (error) {
    console.log("Error getting User by Id");
    res.status(500).send("Server error");
  }
});

module.exports = userRouter;
