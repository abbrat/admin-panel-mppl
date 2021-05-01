const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  jobStatus: {
    type: String,
    default: "Not Approved",
  },
  Logo: {
    type: String,
  },
  CompanyName: String,
  Category: String,
  SalaryRange: {
    Starting: {
      type: Number,
    },
    Ending: {
      type: Number,
    },
  },
  Starting: String,
  Distance: String,
  PreviousExp: String,
  CompanyHireRate: String,
  CompanyMemberSince: String,
  Designation: String,
  ContactPerson: String,
  ContactNumber: String,
  ContactEmail: String,
  JobTitle: String,
  JobType: String,
  Qualification: String,
  Experience: Number,
  ExpectedCTC: String,
  Industry: String,
  KeySkills: [String],
  Location: {
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    lat: {
      type: String,
    },
    long: {
      type: String,
    },
  },
  Remarks: String,
  Description: String,
  AboutCompany: String,
  Validity: { type: Date },
  Postions: Number,
  PublishType: {
    type: String,
  },
  Featured: {
    type: Boolean,
    default: false,
  },
  lastUpdate: {
    type: Date,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Questions: {
    type: [Object],
  },
  PostingType: {
    type: String,
  },
  date: { type: Date, default: Date.now() },
});

module.exports = Job = mongoose.model("Job", JobSchema);
