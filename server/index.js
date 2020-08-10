const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const userRouter = require("./routes/users");
const dashRouter = require("./routes/dashboard");
const app = express();
const uploadImage = require("./service/helpers/helper");
const pool = require("./db");

const basePathRouter = express();
const basePath = '/user-service' || '';

app.use(cors());
app.use(basePath, basePathRouter);

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

basePathRouter.disable("x-powered-by");

basePathRouter.use(bodyParser.json());
basePathRouter.use(bodyParser.urlencoded({ extended: false }));
basePathRouter.use(multerMid.single("file"));
basePathRouter.use("/api/users", userRouter);
basePathRouter.use("/dashboard", dashRouter);

basePathRouter.post("/uploads/:id", async (req, res, next) => {
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

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.listen("3003", () => console.log("listening on port 3003"));
