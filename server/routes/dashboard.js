const dashRouter = require("express").Router();
const auth = require("../middleware/auth");
const pool = require("../db");
const axios = require("axios");
const bcrypt = require("bcrypt");
const { notification } = require("../service/Gcp/user-notification");

dashRouter.post("/", async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT u.first_name, u.house, u.profile, h.house_id, h.house_name FROM harrypotter.users u left join harrypotter.house h on u.house = h.house_id   WHERE u.user_id = $1",
      [req.user]
    );
    console.log(user.rows);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
// dashRouter.get("/", (req, res, next) => {
//   const url = "http://hp-api.herokuapp.com/api/characters/house";
//   axios.get(url).then((res) => {
//     console.log(res);
//   });
// });
dashRouter.delete("notifications/", async (req, res) => {
  try {
  } catch (error) {}
});

dashRouter.get("/notifications", async (req, res, next) => {
  try {
    let userId = parseInt(req.params.id);
    const response = await notification;

    // res.send(response);
    const notification = await pool.query("");
    // let title = response.title;

    // let newMessage = response.map((message) => {
    //   return message.map((second) => {
    //     return second.map((last) => {
    //       return last.title;
    //     });
    //   });
    // });
    console.log(`underneath is the response`);
    // console.log(newMessage);

    // console.log(newMessage);

    // let newNotification = {
    //   nId: message.messageId,
    //   nUser: message.userId,
    //   nTitle: message.title,
    //   nMessage: message.message,
    //   nDate: message.date,
    // };

    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

dashRouter.patch("/update/:id", async (req, res, next) => {
  try {
    let userId = parseInt(req.params.id);
    let { userEmail, userPassword, firstName, lastName, profile } = req.body;
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(userPassword, salt);

    const updateUser = {
      userEmail: req.body.userEmail || undefined,
      userPassword: req.body.userPassword || undefined,
      firstName: req.body.firstName || undefined,
      lastName: req.body.lastName || undefined,
      profile: req.body.profile || undefined,
    };
    if (userEmail) {
      await pool.query(
        `update harrypotter.users set user_email = $1 
                                    where "user_id" = $2;`,
        [userEmail, userId]
      );
    }
    if (userPassword) {
      await pool.query(
        `update harrypotter.users set user_password = $1 
                                  where "user_id" = $2;`,
        [bcryptPassword, userId]
      );
    }
    if (firstName) {
      await pool.query(
        `update harrypotter.users set first_name = $1 
                                where "user_id" = $2;`,
        [firstName, userId]
      );
    }
    if (lastName) {
      await pool.query(
        `update harrypotter.users set last_name = $1 
                              where "user_id" = $2;`,
        [lastName, userId]
      );
    }
    if (profile) {
      await pool.query(
        `update harrypotter.users set profile = $1 
                              where "user_id" = $2;`,
        [profile, userId]
      );
    }
    await pool.query("COMMIT;");
    res.send(updateUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = dashRouter;
