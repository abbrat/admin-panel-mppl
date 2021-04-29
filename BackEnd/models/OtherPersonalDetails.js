const mongoose = require("mongoose");
const OtherPersonalDetailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  maritalStatus: {
    type: String,
  },
  nationality: {
    type: String,
  },
  workPhone: {
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
});

module.exports = OtherPersonalDetails = mongoose.model(
  "Other_Personal_Details",
  OtherPersonalDetailSchema
);
