const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("StudyNotes Route is Working");
});

module.exports = router;
