const mongoose = require("mongoose");

const AcademicSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  qualification: {
    type: String,
  },
  boardOrUniversity: {
    type: String,
  },
  passingYear: {
    type: String,
  },
  percentage: {
    type: String,
  },
});

module.exports = Academic = mongoose.model("AcademicDetails", AcademicSchema);
