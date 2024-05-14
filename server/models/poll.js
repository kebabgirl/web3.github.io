const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  title: { type: String, required: true },
  variants: { type: [], required: true },
});

const Poll = mongoose.model("poll", pollSchema);

module.exports = { Poll };
