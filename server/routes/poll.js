const router = require("express").Router();
const { Poll } = require("../models/poll");

router.post("/create", async (req, res) => {
  try {
    await new Poll({ ...req.body }).save();
    res.status(201).send({ message: "Poll created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const results = await Poll.find();
    res.send(results);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    const { title } = req.body;
    const results = await Poll.findOne({ title });
    if (!results) {
      res.status(404).send({ message: "Poll not found" });
    }
    await Poll.deleteOne({ title });
    res.send({ message: "Poll deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
