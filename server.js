const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./routes/authentication.routes");
const verifyToken = require("./middleware/authentication.middleware");
const createRouter = require("./routes/createContent.routes");
const generateRouter = require("./routes/generateContent.routes");
require("dotenv").config();
require("./config/cloudinary.config");

const app = express();
const port = process.env.PORT;
const mongouri = process.env.MONGOURI;

app.use(bodyParser.json());
app.use(cors());

//----------------------- CONNECT MONGODB -----------------------
const clientOptions = {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

mongoose
  .connect(mongouri, clientOptions)
  .then(() => {
    console.log("connected to db");
    app.listen(port, () => {
      console.log(`server running on ${port}`);
    });
  })
  .catch((err) => {
    console.log(`error encountered: ${err}`);
  });

app.get("/", (req, res) => {
  res.send("working fine!");
});

//----------------------- ROUTES -----------------------

// PROTECTED
app.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "route protected successfully" });
});

// AUTH
app.use("/auth", authRouter);

// CREATE PODCAST/ALBUM
app.use("/create", verifyToken, createRouter);
app.use("/generate", verifyToken, generateRouter);
