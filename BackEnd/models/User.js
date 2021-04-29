const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is Required!",
  },
  Designation: {
    type: String,
  },
  email: {
    type: String,
    required: "Email is Required!",
  },
  number: {
    type: Number,
    required: "Phone Number is Required!",
  },
  dob: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  savedJobs: {
    type: [Object],
  },
  webinars: {
    type: [Object],
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
  },
  about: {
    type: String,
  },
  linkdin: {
    type: String,
  },
  resume: {
    type: String,
  },
  videoResume: {
    type: String,
  },
  preferedWorkLocation: {
    type: String,
  },
  maritalStatus: {
    type: String,
  },
  subscription: {
    type: String,
    default: "Free",
  },
  mockTest: {
    Test: {
      Data: {
        type: [Object],
      },
    },
  },
  lastLoggedIn: {
    type: Date,
  },
  banAccount: {
    type: Boolean,
    default: false,
  },
});

module.exports = User = mongoose.model("User", UserSchema);
