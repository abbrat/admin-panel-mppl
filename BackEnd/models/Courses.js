const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  CourseTitle: String,
  Remarks: String,
  Type: String,
  Fees: Number,
  date: { type: Date, default: Date.now() },
  Opted: { type: Boolean, default: false },
});
module.exports = Course = mongoose.model("Course", CourseSchema);
