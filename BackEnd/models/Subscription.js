const mongoose = require("mongoose");
const SubscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  amount: {
    type: String,
  },
  validity: {
    type: String,
  },
  perks: {
    type: String,
  },
});

module.exports = Subscription = mongoose.model(
  "SubscriptionPlans",
  SubscriptionSchema
);
