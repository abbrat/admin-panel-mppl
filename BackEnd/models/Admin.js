const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Admin Name is Required!",
  },
  empID: {
    type: String,
  },
  role: {
    type: [String],
  },
  designation: {
    type: String,
  },
  email: {
    type: String,
    required: "Email is Required!",
  },
  banAccount: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: "Admin Password is Required!",
  },
  number: {
    type: String,
    required: "Admin Number is Required!",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Admin = mongoose.model("Admin", AdminSchema);
