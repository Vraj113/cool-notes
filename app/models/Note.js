const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: { type: String },
  content: { type: String },
  postedBy: { type: String },
  postedOn: { type: Date, default: Date.now },
});

mongoose.models = {};
module.exports = mongoose.model("Note", noteSchema);
