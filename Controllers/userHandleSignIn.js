const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function userHandleSignIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        setuid(user, res);
        res.redirect("/dashboard");
      }
      return res.status(401).send("Invalid password");
    } else res.send("UserNotFound");
  } catch (e) {
    console.log(e.message);
  }
}

function setuid(user, res) {
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
    },
    process.env.SECRET_KEY
  );
  res.cookie("uid", token);
}

module.exports = userHandleSignIn;
