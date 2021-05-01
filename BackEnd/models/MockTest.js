const mongoose = require("mongoose");
const MockTestSchema = new mongoose.Schema({
  TestCode: {
    type: String,
  },
  TestTitle: {
    type: String,
  },
  Guidelines: {
    type: String,
  },
  TestDescription: {
    type: String,
  },
  Category: {
    type: String,
  },
  Duration: {
    type: String,
  },
  Validity: {
    type: Date,
  },
  Users: {
    type: [Object],
  },
  TestData: {
    type: [Object],
  },
  LastUpdate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = MockTest = mongoose.model("MockTest", MockTestSchema);
