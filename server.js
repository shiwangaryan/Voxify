const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/authentication.routes");
const verifyToken = require("./middleware/authentication.middleware");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
const mongouri = process.env.MONGOURI;

app.use(bodyParser.json());
app.use(cors());

//----------------------- connecting to mongodb using mongoose:
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

//----------------------- routes usage:
app.use("/auth", authRouter);

//----------------------- middleware to protect routes using jwt:
app.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({message: "route protected successfully"});
})