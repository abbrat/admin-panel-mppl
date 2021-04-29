const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  CompanyName: {
    type: String,
  },
  CompanyEmail: {
    type: String,
  },
  CompanyContact: {
    type: Number,
  },
  CIN: {
    type: String,
  },
  CompanyDescription: {
    type: String,
  },
  JoiningDate: {
    type: String,
  },
  Subsciption: {
    type: String,
  },
  HeadOffice: {
    type: String,
  },
  OtherOffices: {
    type: [String],
  },
  Validity: {
    type: Date,
  },
  Website: {
    type: String,
  },
  Logo: {
    type: String,
  },
  CompanyHireRate: {
    type: String,
  },
  AboutCompany: {
    type: String,
  },
  PostedJobs: {
    type: [Object],
  },
});

module.exports = Company = mongoose.model("Companies", CompanySchema);
