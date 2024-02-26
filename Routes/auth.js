const express = require("express");
const handleSignUp = require("../Controllers/userHandleSignup");
const handleSignIn = require("../Controllers/userHandleSignIn");
const signUpValidate = require("../Middleware/loginValidator");

const SignUpRouter = express.Router();
const SignInRouter = express.Router();

SignUpRouter.post("/", signUpValidate, handleSignUp);
SignInRouter.post("/", handleSignIn);

module.exports = { SignUpRouter, SignInRouter };
