const mongoose = require("mongoose");
const TestQuestionSchema = new mongoose.Schema({
  TestCode: {
    type: String,
  },

  Question: {
    type: String,
  },
  Option1: {
    type: String,
  },
  Option2: {
    type: String,
  },
  Option3: {
    type: String,
  },
  Option4: {
    type: String,
  },
  CorrectOption: {
    type: String,
  },
  Users: {
    type: [Object],
  },
  Marks: {
    type: Number,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  LastUpdate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = TestQuestion = mongoose.model(
  "TestQuestion",
  TestQuestionSchema
);
