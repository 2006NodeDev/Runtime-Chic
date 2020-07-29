const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const userRouter = require("./routes/users");
const dashRouter = require("./routes/dashboard");
const app = express();
const uploadImage = require("./helpers/helper");
const pool = require("./db");

app.use(cors());

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.disable("x-powered-by");
app.use(multerMid.single("file"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/users", userRouter);
app.use("/dashboard", dashRouter);

app.post("/uploads/:id", async (req, res, next) => {
  try {
    let userId = parseInt(req.params.id);
    console.log(userId);

    console.log(req.file);
    const myFile = req.file;
    const imageUrl = await uploadImage(myFile);

    await pool.query(
      `update harrypotter.users set "profile" = $1 
                                  where "user_id" = $2;`,
      [imageUrl, userId]
    );

    res.status(200).json({
      message: "Upload was successful",
      data: imageUrl,
    });
  } catch (error) {
    next(error);
  }
});

app.listen("3003", () => console.log("listening on port 3003"));
