require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 4040;

// Init
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

/* Routes */
app.get('/', (req, res) => { res.status(200).send('Welcome to Do-tout. API 👋')});
// Auth
app.use("/api/auth", require("./routes/auth.route.js"));
// Tasks
app.use("/api/tasks", require("./routes/task.route.js"));

/* Routes */

// Run
const run = async () => {
  // DB
  const db = mongoose.connect(process.env.MONGODB_URL, () => {
    console.log("Connected to DB!");
  });
  // Listening
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

run();
