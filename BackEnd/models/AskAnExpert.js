const mongoose = require("mongoose");

const AskAnExpertSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Phone: Number,
  Message: String,
  replied: Boolean,
});

module.exports = AskAnExpert = mongoose.model("AskAnExpert", AskAnExpertSchema);
