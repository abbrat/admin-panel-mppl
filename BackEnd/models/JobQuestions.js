const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  jobID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  Question: {
    type: String,
  },
  Answer: {
    type: [Object],
  },

  isDone: {
    type: Boolean,
    default: false,
  },
});

module.exports = JobQuestions = mongoose.model("JobQuestions", QuestionSchema);
