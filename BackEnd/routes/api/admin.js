const express = require("express");
const Admin = require("../../models/Admin");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const sgMail = require("@sendgrid/mail");
const Jobs = require("../../models/Jobs");
const Profile = require("../../models/Profile");
const ProfessionalDetails = require("../../models/ProfessionalDetails");
const AcademicQualification = require("../../models/AcademicQualification");
const OtherPersonalDetails = require("../../models/OtherPersonalDetails");
const HigherQualification = require("../../models/HigherQualification");
const SocialConnects = require("../../models/SocialConnects");
const Resume = require("../../models/Resume");
const moemnt = require("moment");

sgMail.setApiKey(
  "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"
);

const genEmpID = () => {
  var digits = "0123456789";
  var id = "";
  for (let i = 0; i < 6; i++) {
    id += digits[Math.floor(Math.random() * 10)];
  }
  return "E" + id;
};

//@TEST ROUTE
//@GET User as per Pagination
router.get("/users/:page/:perPage", async (req, res) => {
  try {
    const page = req.params.page * 1 || 1;
    const limit = req.params.perPage * 1 || 10;

    const skip = (page - 1) * limit;
    const admins = await Admin.find().skip(skip).limit(limit);

    res.json({ admins });
  } catch (error) {
    console.log(error.message);
  }
});

//@GET Route
//@DESC Test Route
router.post("/test", async (req, res) => {
  var date = moemnt(new Date()).format("YYYY-MM-DD, hh:mm:ss");
  var date2 = moemnt("2020-03-03T15:55:44.074Z").format("YYYY-MM-DD, hh:mm:ss");
  var d3 = req.body.date;
  if (date > d3) {
    return res.json({ msg: "Date 1 is Greater", date: date });
  } else {
    return res.json({ msg: "Date 2 is Greater", date: d3 });
  }
});

//@Get Route
//@DESC Get Current Admin Details
router.get("/me", auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.json({ msg: "No Admin Found" });
    }
    res.json(admin);
  } catch (error) {
    console.log(error.message);
  }
});

//@GET Route
//@DESC Get all the Admins
router.get("/", auth, async (req, res) => {
  try {
    const admins = await Admin.find({ banAccount: false });
    if (admins.length == 0) {
      return res.json({ msg: "No Admins Created Yet" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

//@GET Route
//@DESC Get User Details by their ID
router.get("/user/details/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const profile = await Profile.findOne({
      user: req.params.id,
    });
    const professional = await ProfessionalDetails.findOne({
      user: req.params.id,
    });
    const academic = await AcademicQualification.findOne({
      user: req.params.id,
    });
    const other = await OtherPersonalDetails.findOne({
      user: req.params.id,
    });
    const higherEducation = await HigherQualification.findOne({
      user: req.params.id,
    });
    const social = await SocialConnects.findOne({
      user: req.params.id,
    });
    const resume = await Resume.findOne({
      user: req.params.id,
    });
    // if (
    //   !profile &&
    //   !professional &&
    //   !academic &&
    //   !other &&
    //   !higherEducation &&
    //   !social &&
    //   !resume
    // ) {
    //   return res
    //     .status(400)
    //     .json({ msg: "User has not created his/her Profile Yet" });
    // }
    res.json({
      user: user,
      profileData: profile,
      professionalData: professional,
      academicData: academic,
      otherData: other,
      higherEducationData: higherEducation,
      socialData: social,
      resumeData: resume,
    });
  } catch (error) {}
});

//@GET Admins
router.get("/allAdmins", async (req, res) => {
  try {
    const admin = await Admin.find({ banAccount: false });
    if (admin.length == 0) {
      return res.json({ msg: "No Admin Found!" });
    }
    res.json(admin);
  } catch (error) {
    console.log(error.message);
  }
});

//@POST Route
//@DESC Create an Admin
router.post("/", async (req, res) => {
  const { name, email, password, number, role, designation } = req.body;
  const adminFields = {};
  try {
    if (name) adminFields.name = name;
    if (role) adminFields.role = role;
    if (email) adminFields.email = email;
    if (number) adminFields.number = number;
    if (designation) adminFields.designation = designation;
    if (password) adminFields.password = password;
    var admin = await Admin.findOne({ email: email });

    if (admin) {
      return res.status(200).json({ msg: "Admin Already Exists" });
    }
    empID = genEmpID();
    admin = await Admin.findOne({ empID: empID });
    if (!admin) {
      adminFields.empID = empID;
    } else {
      empID = genEmpID();
    }
    admin = new Admin(adminFields);
    const salt = await bcryptjs.genSalt(10);
    admin.password = await bcryptjs.hash(password, salt);

    await admin.save();
    const payload = {
      user: {
        id: admin.id,
      },
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) throw err;
        return res.json({
          msg: "Admin Created Successfully",
          token: token,
          admin: admin,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

//@GET Route
//@DESC Admin Route to get All the Users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({ banAccount: false });
    if (users.length == 0) {
      return res.json({ msg: "No Users Registered Yet!" });
    }
    res.json(users);
  } catch (error) {
    console.log(error.message);
  }
});

//getting data of an admin through tokens which should not be possible at all
// like this , instead a whole database should be maintained of user
router.get("/getdata", auth, async (req, res) => {
  var admin;
  console.log(req.user);
  try {
    admin = await Admin.findById({ _id: req.user.id });
    if (!admin) {
      return res.status(404).json("error");
    }
    console.log(admin.email);
    return res.status(200).json(admin);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//@POST Route
//@Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.json({ msg: "Admin Doesnt Exists!" });
  }
  const isMatch = await bcryptjs.compare(password, admin.password);
  console.log(isMatch);
  if (!isMatch) {
    return res.json({ msg: "Invalid Credentials!" });
  }
  const payload = {
    user: {
      id: admin.id,
    },
  };
  const token = await jwt.sign(payload, config.get("jwtSecret"), {
    expiresIn: 36000000,
  });
  res.json({ msg: "User Logged in Successfully", token: token });
});

//@PUT Route
//@DESC Update Admin Details
router.put("/update/:id", auth, async (req, res) => {
  const { name, designation, email, oldPassword, newPassword } = req.body;
  const adminFields = {};
  try {
    if (name) adminFields.name = name;
    if (designation) adminFields.designation = designation;
    if (email) adminFields.email = email;
    if (newPassword) adminFields.password = newPassword;
    var admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.json({ msg: "No Admin Found" });
    }

    if (newPassword && oldPassword) {
      const isMatch = await bcryptjs.compare(oldPassword, admin.password);
      if (!isMatch) {
        return res.status(200).json({ msg: "Please Enter a Valid Password" });
      }
      const salt = await bcryptjs.genSalt(10);
      adminFields.password = await bcryptjs.hash(newPassword, salt);
      admin = await Admin.findOneAndUpdate(
        { id: req.params.id },
        {
          $set: adminFields,
        },
        {
          new: true,
        }
      );
      return res.json({ msg: "User Updated", data: admin });
    }
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "Please Enter a Valid ID" });
    }
  }
});

//@POST Route
//@DESC Disapprove Jobs
router.post("/decline/:id", async (req, res) => {
  const { email, reason } = req.body;
  try {
    const job = await Jobs.findById(req.params.id);
    if (!job) {
      return res.json({ msg: "No Job Found!" });
    }

    await Jobs.findByIdAndDelete(req.params.id);
    const msg = {
      to: email + "",
      from: "vedant.pruthi.io@gmail.com",
      subject: "Job not Approved!",
      text: "Sample Text",
      html:
        "Hey " +
        " <br> Sorry to Say! Your Job was Declined Due to " +
        reason +
        " and Got Deleted!",
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email Sent", msg);
        res.json({ msg: "Email Sent", msg: msg });
      })
      .catch((error) => {
        console.log(error.message);
      });
    res.json({
      msg:
        "Job Declined and Deleted. Message Sent to the Respective Job Holder!",
    });
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "Please Enter a Valid Job ID" });
    }
  }
});

//@GET Route
//@DESC Send mail to the Clients or Other Admins as Per their ID
router.post("/sendEmail", async (req, res) => {
  var msg = {
    to: req.body.reciever + "",
    from: "vedant.pruthi.io@gmail.com",
    subject: req.body.subject + "",
    text: "Sample Text",
    html: req.body.message + "",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email Sent", msg);
      res.json({ msg: "Email Sent", msg: msg });
    })
    .catch((error) => {
      console.log(error.message);
    });
  try {
  } catch (error) {
    console.log(error.response.body);
  }
});

//@Ban Account
//@GET ROUTE
router.get("/banAccount/:id", async (req, res) => {
  try {
    var admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.json({ msg: "No Admin Found!" });
    }
    admin = await Admin.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { banAccount: true } },
      { new: true }
    );
    res.json({ msg: "Admin Blocked!" });
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "Please Enter a Valid ID" });
    }
  }
});

//@UnBan Account
//@GET ROUTE
router.get("/unBanAccount/:id", async (req, res) => {
  try {
    var admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.json({ msg: "No Admin Found!" });
    }
    admin = await Admin.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { banAccount: false } },
      { new: true }
    );
    res.json({ msg: "Admin unBlocked!" });
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "Please Enter a Valid ID" });
    }
  }
});

//@GET Ban Accounts
router.get("/bannedAdmins", async (req, res) => {
  try {
    var admins = await Admin.find({ banAccount: true });
    if (admins.length == 0) {
      return res.json({ msg: "Admins Not Found!" });
    }
    res.json({ admins });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
