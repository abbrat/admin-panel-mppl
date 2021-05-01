const auth = require("../../middleware/auth");
const WebinarApplications = require("../../models/WebinarApplications");

const router = require("express").Router();

//@GET All Applications
router.get("/", auth, async (req, res) => {
  try {
    var webApps = await WebinarApplications.find({ userID: req.user.id });
    if (webApps.length == 0) {
      return res.json({ msg: "No Webinars Applied by this User" });
    }

    res.json(webApps);
  } catch (error) {
    console.log(error.message);
  }
});

//@GET Past Applications

router.get("/past", auth, async (req, res) => {
  try {
    var webApps = await WebinarApplications.find({ userID: req.user.id });
    if (webApps.length == 0) {
      return res.json({ msg: "No Webinars Applied by this User" });
    }
    var pastApps = webApps.filter((webinar) => {
      if (Date.now() > webinar.webinarDetail.date) {
        return webinar;
      }
    });
    if (pastApps.length == 0) {
      return res.json({ msg: "No Webinars!" });
    }
    res.json(pastApps);
  } catch (error) {
    console.log(error.message);
  }
});

//@GET Upcomiing Applications
router.get("/upcoming", auth, async (req, res) => {
  try {
    var webApps = await WebinarApplications.find({ userID: req.user.id });
    if (webApps.length == 0) {
      return res.json({ msg: "No Webinars Applied by this User" });
    }
    var pastApps = webApps.filter((webinar) => {
      if (Date.now() < webinar.webinarDetail.date) {
        return webinar;
      }
    });
    if (pastApps.length == 0) {
      return res.json({ msg: "No Webinars!" });
    }
    res.json(pastApps);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
