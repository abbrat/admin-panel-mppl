const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "Pending Confirmation",
  },
  jobDetail: {
    type: Object,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = Applications = mongoose.model(
  "Applications",
  ApplicationSchema
);
