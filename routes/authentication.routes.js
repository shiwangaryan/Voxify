const express = require("express");
const {
  register,
  loginPasswordCheck,
  loginUsernameCheck,
} = require("../controllers/authentication/authentication.controller");
const {
  verifyUser,
  resendVerificationMail,
} = require("../controllers/authentication/verifyemail.controller");
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.get("/verify-email", verifyUser);
// authRouter.post("/resend-verification", resendVerificationMail);
authRouter.post("/login/verifyUsername", loginUsernameCheck);
authRouter.post("/login/verifyPassword", loginPasswordCheck);

module.exports = authRouter;
