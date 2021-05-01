const mongoose = require("mongoose");

const SavedJobSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  jobTitle: {
    type: String,
  },
  CompanyName: {
    type: String,
  },
  Location: { type: String },
  Logo: { type: String },
  jobID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = SavedJob = mongoose.model("SavedJob", SavedJobSchema);
