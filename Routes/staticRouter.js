const express = require("express");
const staticRouter = express.Router();
const getuid = require("../Middleware/verifyUser");

staticRouter.get("/signup", (req, res) => {
  return res.render("signup");
});
staticRouter.get("/signin", (req, res) => {
  return res.render("signin");
});

staticRouter.get("/dashboard", getuid, async (req, res) => {
  return res.render("dashboard");
});

staticRouter.get("/", async (req, res) => {
  return res.redirect("/dashboard");
});

module.exports = staticRouter;
