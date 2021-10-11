const express = require("express");
const ValidateId = require("../middleware/ValidateId");
const { Genre, validate } = require("../models/Genre");
const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find({});
  return res.status(200).send(genres);
});

router.post("/", async (req, res) => {
  const { error, value } = validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let genre = new Genre(value);
  genre = await genre.save();

  return res.status(200).send(genre);
});

router.get("/:id", ValidateId, async (req, res) => {
  const id = req.params.id;
  const genre = await Genre.findById(id);

  if (!genre) {
    return res.status(404).send("Genre not found");
  }
  return res.status(200).send(genre);
});

router.put("/:id", ValidateId, async (req, res) => {
  const id = req.params.id;
  const { error, value } = validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const genre = await Genre.findByIdAndUpdate(id, value, { new: true });

  if (!genre) {
    return res.status(404).send("Genre not found");
  }
  return res.status(200).send(genre);
});

module.exports = router;
