const express = require("express");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const staticRouter = require("./Routes/staticRouter");
const { SignUpRouter, SignInRouter } = require("./Routes/auth");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Database connection
const dbRoute = process.env.MONGO_URI;
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Database connected successfully"));

async function startServer() {
  // Express app
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(expressValidator());

  // View engine setup (using EJS)
  app.set("view engine", "ejs");

  // Routes
  app.use("/", staticRouter);
  app.use("/signup", SignUpRouter);
  app.use("/signin", SignInRouter);

  // Error handling middleware
  app.use((err, res) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  });

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
}

startServer();
