const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Webinar = require("../../models/Webinar");
const moment = require("moment");
const WebinarApplications = require("../../models/WebinarApplications");

const router = require("express").Router();

//@GET Route
//@DESC Get all the Webinarss
router.get("/all", async (req, res) => {
  try {
    const webinars = await Webinar.find({ webinarDate: { $gte: Date.now() } });
    if (webinars.length == 0) {
      return res.json({ msg: "No Webinars Found!" });
    }
    res.json(webinars);
  } catch (error) {
    console.log(error.message);
  }
});

//@GET Route
//@DESC Webinars by Date
router.post("/allWebinars", async (req, res) => {
  try {
    console.log("Response Console from Webinar");
    var webinar = await Webinar.find();
    if (webinar.length == 0) {
      return res.json({ msg: "No Webinars Created Yet!" });
    }
    var webinars = [];
    webinars = webinar.filter((webinar) => {
      if (
        req.body.date <= moment(webinar.date).format("YYYY-MM-DD, HH:mm:ss")
      ) {
        return webinar;
      }
    });
    if (req.body.date == "") {
      return res.json(webinar);
    }
    if (webinars.length == 0) {
      return res.json({ msg: "No Updated Webinars!" });
    }

    res.json(webinars);
  } catch (error) {
    console.log(error.message);
  }
});

//@POST Route
//@DESC Create the Webinars
router.post("/createWebinar", async (req, res) => {
  const {
    webinarLink,
    webinarTitle,
    webinarType,
    webinarDate,
    webinarTime,
    webinarDescription,
    webinarKeywords,
    webinarAudience,
    webinarInstructor,
  } = req.body;
  var webinarFields = {};
  try {
    if (webinarLink) webinarFields.webinarLink = webinarLink;
    if (webinarTitle) webinarFields.webinarTitle = webinarTitle;
    if (webinarTitle) webinarFields.webinarTitle = webinarTitle;
    if (webinarType) webinarFields.webinarType = webinarType;
    if (webinarDate) webinarFields.webinarDate = webinarDate;
    if (webinarTime) webinarFields.webinarTime = webinarTime;
    if (webinarDescription)
      webinarFields.webinarDescription = webinarDescription;
    if (webinarKeywords) webinarFields.webinarKeywords = webinarKeywords;
    if (webinarAudience) webinarFields.webinarAudience = webinarAudience;
    if (webinarInstructor) webinarFields.webinarInstructor = webinarInstructor;
    var webinar = new Webinar(webinarFields);
    await webinar.save();
    res.json({ msg: "Webinar Created!", webinar: webinar });
  } catch (error) {
    console.log(error.message);
  }
});

//@POST Route
//@DESC Apply for Webinar
router.post("/apply/:id", auth, async (req, res) => {
  var webApp = {
    userID: req.user.id,
    webinarID: req.params.id,
  };
  try {
    var webinarFields = {
      applicants: {
        number: 0,
      },
    };
    var user = await User.findOne({ _id: req.user.id });
    var webinar = await Webinar.findOne({ _id: req.params.id });
    if (!webinar) {
      return res.json({ msg: "Wrong Webinar ID" });
    }
    webApp.webinarDetail = webinar;

    var webinarApplication = new WebinarApplications(webApp);
    await webinarApplication.save();
    var NoOfApplicants = webinar.applicants.number;
    NoOfApplicants++;
    webinarFields.applicants.number = NoOfApplicants;
    webinar = await Webinar.findOneAndUpdate(
      { _id: req.params.id },
      { $set: webinarFields },
      { new: true }
    );
    var webs = [];
    webs = user.webinars;
    webs.push(webinar);
    user = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $set: { webinars: webs },
      },
      {
        new: true,
      }
    );
    res.json({ msg: "Webinar Applied Successfully!", webinar: webinar });
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "Wrong Webinar ID . Please Enter it Again!" });
    }
  }
});

//@DELETE Webinar
//@DESC Delete the Webinar By ID
router.delete("/delete/:id", async (req, res) => {
  try {
    await Webinar.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: "Webinar Deleted!" });
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "Please Enter a Valid Webinar ID" });
    }
  }
});

//@PUT Route
//@DESC Update Webinar By ID
router.put("/update/:id", async (req, res) => {
  const {
    webinarLink,
    webinarTitle,
    webinarType,
    webinarDate,
    webinarTime,
    webinarDescription,
    webinarKeywords,
    webinarAudience,
    webinarInstructor,
  } = req.body;
  var webinarFields = {};
  try {
    if (webinarLink) webinarFields.webinarLink = webinarLink;
    if (webinarTitle) webinarFields.webinarTitle = webinarTitle;
    if (webinarTitle) webinarFields.webinarTitle = webinarTitle;
    if (webinarType) webinarFields.webinarType = webinarType;
    if (webinarDate) webinarFields.webinarDate = webinarDate;
    if (webinarTime) webinarFields.webinarTime = webinarTime;
    if (webinarDescription)
      webinarFields.webinarDescription = webinarDescription;
    if (webinarKeywords) webinarFields.webinarKeywords = webinarKeywords;
    if (webinarAudience) webinarFields.webinarAudience = webinarAudience;
    if (webinarInstructor) webinarFields.webinarInstructor = webinarInstructor;
    webinarFields.lastUpdate = Date.now();
    var webinar = await Webinar.findOneAndUpdate(
      { _id: req.params.id },
      { $set: webinarFields },
      { new: true }
    );
    res.json({ msg: "Webinar Updated!", webinar: webinar });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/inActive", async (req, res) => {
  try {
    var webinar = await Webinar.find({ webinarDate: { $lt: Date.now() } });

    if (webinar.length === 0) {
      return res.json({ status: "failure", msg: "No Webinar Found!" });
    }
    res.json({ status: "success", webinar });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "failure", msg: "Error" });
  }
});

//@TEST ROUTE
//@GET User as per Pagination
router.get("/users/:page/:perPage", async (req, res) => {
  try {
    // var page = parseInt(req.params.page);
    // var perPage = parseInt(req.params.perPage);
    // var users = await Webinar.find();
    // if (users.length == 0) {
    //   return res.json({ msg: "No Users Found!" });
    // }
    // if (perPage * page < users.length) {
    //   var user2 = await Webinar.find()
    //     .limit(perPage + 1)
    //     .skip(perPage * page + 1);

    //   return res.json(user);
    // }
    // user = await Webinar.find()
    //   .limit(perPage)
    //   .skip(perPage * page);

    const page = req.params.page * 1 || 1;
    const limit = req.params.perPage * 1 || 10;
    const skip = (page - 1) * limit;

    console.log(Date.now());

    const user = await Webinar.find({
      webinarDate: { $gte: Date.now() },
    })
      .skip(skip)
      .limit(limit);

    res.json({ user });
  } catch (error) {
    console.log(error.message);
  }
  //   try {
  //     var page = parseInt(req.params.page);
  //     var perPage = parseInt(req.params.perPage);
  //     var users = await Webinar.find();
  //     if (users.length == 0) {
  //       return res.json({ msg: "No Users Found!" });
  //     }
  //     if (perPage * page < users.length) {
  //       console.log("fdfds", perPage * page);
  //       var user2 = await Webinar.find()
  //         .limit(perPage + 1)
  //         .skip(perPage * page + 1);
  //       console.log("fds", user2);
  //     }
  //     console.log(users.length);
  //     user = await Webinar.find()
  //       .limit(perPage)
  //       .skip(perPage * page);
  //     res.json(user);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
});
module.exports = router;
