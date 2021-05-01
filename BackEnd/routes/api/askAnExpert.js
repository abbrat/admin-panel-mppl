const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const AskAnExpert = require("../../models/AskAnExpert");

router.post("/", auth, async (req, res) => {
  const { CourseTitle, Remarks, Type, Fees, Opted } = req.body;

  askAnExpert = new AskAnExpert({
    Name,
    Email,
    Phone,
    Message,
  });

  await askAnExpert
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
