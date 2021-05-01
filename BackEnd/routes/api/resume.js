const router = require("express").Router();
const pdf = require("html-pdf");
const pdfTemplate = require("../../templates");
//@POST Route
//@DESC Create User Resume

// router.use(require('express').static)
router.post("/create-resume", async (req, res) => {
  await pdf
    .create(pdfTemplate(req.body), {})
    .toFile(req.body.name + " Resume.pdf", (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Success");
    });
});

//@GET Resume
router.get("/get-resume/:name", (req, res) => {
  try {
    res.sendFile(`../../${req.params.name} Resume.pdf`);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
