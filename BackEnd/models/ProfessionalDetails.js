const mongoose = require("mongoose");

const ProfessionalDetailsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  experienceFrom: {
    type: String,
  },
  experienceTo: {
    type: String,
  },
  annualSalary: {
    type: String,
  },
  designation: {
    type: String,
  },
  employer: {
    type: String,
  },
  functionalArea: {
    type: String,
  },
  role: {
    type: String,
  },
  industry: {
    type: String,
  },
  currentlyWorking: {
    type: Boolean,
    default: false,
  },
});

module.exports = ProfessionalDetails = mongoose.model(
  "Professional_Details",
  ProfessionalDetailsSchema
);
