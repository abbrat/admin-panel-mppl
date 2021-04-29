const mongoose = require("mongoose");

const ConsultantSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  sector: {
    type: String,
  },
  about: {
    type: String,
  },
  membershipDate: {
    type: String,
  },
  educationInfo: {
    type: String,
  },
  experience: {
    type: String,
  },
  banAccount: {
    type: Boolean,
    default: false,
  },
});

module.exports = Consultant = mongoose.model("Consultant", ConsultantSchema);
