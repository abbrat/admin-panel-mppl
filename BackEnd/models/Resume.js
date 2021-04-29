const mongoose = require("mongoose");
const ResumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  resumeTitle: {
    type: String,
  },
  resumeFile: {
    type: Buffer,
    contentType: String,
  },
  resumeVideo: {
    type: String,
  },
});

module.exports = Resume = mongoose.model("Resume", ResumeSchema);
