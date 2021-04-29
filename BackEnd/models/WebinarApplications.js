const mongoose = require("mongoose");

const WebinarApplicationSchema = new mongoose.Schema({
  webinarDetail: {
    type: Object,
  },
  webinarStatus: {
    type: String,
    default: "Not Attended",
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  webinarID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  applicants: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = WebinarApplications = mongoose.model(
  "WebinarApplications",
  WebinarApplicationSchema
);
