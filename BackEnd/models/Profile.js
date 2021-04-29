const mongoose = require("mongoose");
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  number: {
    type: Number,
  },
  maritalStatus: {
    type: String,
  },
  userPhoto: {
    type: String,
    default: "https://i.ibb.co/dJT43Mc/user.png",
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  passportNumber: {
    type: String,
  },
  expectedSalary: {
    type: String,
  },
  noticePeriod: {
    type: String,
  },
  currentLocation: {
    type: String,
  },
  preferredLocation: {
    type: [String],
  },
  currentSalary: {
    type: String,
  },
  addressLine1: {
    type: String,
  },
  addressLine2: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: String,
  },
  country: {
    type: String,
  },
  skills: {
    type: [String],
  },
  languages: {
    type: [String],
  },
  additionalSkills: {
    type: String,
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
  aboutUser: {
    type: String,
  },
});

module.exports = Profile = mongoose.model("Profile", ProfileSchema);
