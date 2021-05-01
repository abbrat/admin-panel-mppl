const Subscription = require("../../models/Subscription");

const router = require("express").Router();

//@GET Route
//@DESC Get Subscription
router.get("/", async (req, res) => {
  try {
    const subs = await Subscription.find();
    if (subs.length == 0) {
      return res.json({ msg: "No Subs Plans found!" });
    }
    res.json(subs);
  } catch (error) {
    console.log(error.message);
  }
});

//@POST Route
//@DESC Create Subs Plans
router.post("/", async (req, res) => {
  const { name, amount, validity, perks } = req.body;
  var subsFields = {};
  try {
    if (name) subsFields.name = name;
    if (amount) subsFields.amount = amount;
    if (validity) subsFields.validity = validity;
    if (perks) subsFields.perks = perks;
    var subs = await Subscription.findOne({ name });
    if (subs) {
      return res.json({ msg: "Subs Already Created!" });
    }
    subs = new Subscription(subsFields);
    await subs.save();
    res.json({ msg: "Subscription Plan Added", subscription: subs });
  } catch (error) {
    console.log(error.message);
  }
});

//@PUT Route
//@DESC Update Subscription Plan by ID
router.put("/update/:id", async (req, res) => {
  const { name, amount, validity, perks } = req.body;
  var subsFields = {};
  try {
    if (name) subsFields.name = name;
    if (amount) subsFields.amount = amount;
    if (validity) subsFields.validity = validity;
    if (perks) subsFields.perks = perks;
    var subs = await Subscription.findOne({ _id: req.params.id });
    if (!subs) {
      return res.json({ msg: "Subs Not Created!" });
    }
    subs = await Subscription.findOneAndUpdate(
      { _id: req.params.id },
      { $set: subsFields },
      { new: true }
    );
    res.json({ msg: "Plan Updated", subscription: subs });
  } catch (error) {
    console.log(error.message);
  }
});

//@DELETE Route
//@DESC Delete Subscription by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    await Subscription.findByIdAndRemove(req.params.id);
    res.json({ msg: "Plan removed!" });
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "Please enter a Valid Id" });
    }
  }
});
module.exports = router;
