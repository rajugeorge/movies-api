const express = require("express");
const errors = require("./middleware/AsyncError");
const app = express();
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");
const { createLogger, transports } = require("winston");

const genres = require("./routes/genres");
const users = require("./routes/users");
const auth = require("./routes/auth");

const logger = createLogger({
  transports: [new transports.File({ filename: "combined.log" })],
  exceptionHandlers: [new transports.File({ filename: "exceptions.log" })],
  rejectionHandlers: [new transports.File({ filename: "rejections.log" })],
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("Hello world with nodemon");
});

app.use("/api/genres", genres);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(errors);

const server = app.listen(config.get("port"), async () => {
  console.log("server started");
  try {
    const dbUrl = `mongodb://${config.get("db_user")}:${config.get(
      "db_pass"
    )}@${config.get("db_url")}/${config.get("db")}?authSource=admin`;
    console.log(dbUrl);
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(dbUrl, options);
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = server;
