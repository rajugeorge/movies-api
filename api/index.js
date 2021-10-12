const express = require("express");
const app = express();
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");

const genres = require("./routes/genres");
const users = require("./routes/users");
const auth = require("./routes/auth");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("Hello world with nodemon");
});

app.use("/api/genres", genres);
app.use("/api/users", users);
app.use("/api/auth", auth);

const server = app.listen(config.get("port"), async () => {
  console.log("server started");
  try {
    console.log(config.get("db"));
    await mongoose.connect(`mongodb://localhost:27017/${config.get("db")}`);
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = server;
