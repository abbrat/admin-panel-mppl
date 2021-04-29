const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  otp: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 900,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
});

module.exports = Otp = mongoose.model("Otp", OtpSchema);
