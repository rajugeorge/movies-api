const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/User");

const router = require("express").Router();

router.post("/", async (req, res) => {
  // check if the input is valid
  const { error, value } = validate(req.body);

  if (error) {
    return res.status(400).send(error.message);
  }
  // check if the user exists
  const user = await User.findOne({ email: value.email }).exec();

  if (!user) {
    return res.status(404).send("User does not exist");
  }
  // check if the credentials are valid
  const validPassword = await bcrypt.compare(value.password, user.password);
  if (!validPassword) return res.status(401).send("Invalid credentials");

  const token = user.generateAuthToken();

  return res.send({ token });
});

function validate(input) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(input);
}

module.exports = router;
