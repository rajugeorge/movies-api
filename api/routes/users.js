const bcrypt = require("bcrypt");
const express = require("express");
const { User, validate } = require("../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error, value } = validate(req.body);

  if (error) {
    return res.status(400).send(error.message);
  }

  let user = await User.findOne({ email: value.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(value);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const { _id, name, email } = await user.save();
  const token = user.generateAuthToken();

  return res.header("x-auth-token", token).send({ _id, name, email });
});

module.exports = router;
