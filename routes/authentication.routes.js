const express= require('express');
const { register, loginPasswordCheck, loginUsernameCheck } = require('../controllers/authentication.controller');
const authRouter= express.Router();

authRouter.post("/register", register);
authRouter.post("/login/verifyUsername", loginUsernameCheck);
authRouter.post("/login/verifyPassword", loginPasswordCheck);

module.exports = authRouter;