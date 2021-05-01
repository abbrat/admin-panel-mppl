const mongoose = require("mongoose");

const WebinarSchema = new mongoose.Schema({
  applicants: {
    number: {
      type: Number,
      default: 0,
    },
  },
  webinarStatus: {
    type: String,
    default: "Not Attended",
  },
  webinarLink: {
    type: String,
  },
  webinarTitle: {
    type: String,
  },
  webinarType: {
    type: String,
  },
  webinarDate: {
    type: String,
  },
  webinarTime: {
    type: String,
  },
  webinarDescription: {
    type: String,
  },
  webinarKeywords: {
    type: [String],
  },
  webinarAudience: {
    type: String,
  },
  Validity: {
    type: Date,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  webinarInstructor: {
    instructorName: {
      type: String,
    },
    designation: {
      type: String,
    },
    aboutInstructor: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Webinar = mongoose.model("Webinar", WebinarSchema);
