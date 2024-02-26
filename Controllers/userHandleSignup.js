const User = require("../Models/user");

async function handleSignUp(req, res) {
  const { username, email, password } = req.body;

  // Check if username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: "Username is already taken" });
  }

  // Create a new user object
  const newUser = new User({
    username,
    email,
    password,
  });

  try {
    // Save the new user to the database
    await newUser.save();
    res.redirect("/signin");
  } catch (error) {
    console.error("Error occurred while saving user:", error);
    return res.status(500).json({ error: "Failed to create user" });
  }
}

module.exports = handleSignUp;
