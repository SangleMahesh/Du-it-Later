const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function userHandleSignIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).send("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("uid", token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error in userHandleSignIn:", error.message);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = userHandleSignIn;
