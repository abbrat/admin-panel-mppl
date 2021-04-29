const mongoose = require("mongoose");
const HigherQualificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  qualification: {
    type: String,
  },
  institute: {
    type: String,
  },
  specialization: {
    type: String,
  },
  passingYear: {
    type: String,
  },
});

module.exports = HigherQualications = mongoose.model(
  "Higher_Qualifications",
  HigherQualificationSchema
);
