const mongoose = require("mongoose");
const SocialConnectsScehma = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  linkdIn: {
    type: String,
  },
  skype: {
    type: String,
  },
  googleChat: {
    type: String,
  },
  googleDuo: {
    type: String,
  },
});

module.exports = SocialConnects = mongoose.model(
  "Social_Connects",
  SocialConnectsScehma
);
