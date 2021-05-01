const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require("../../models/User");
const mailer = require("../../NodeMailer");
const Token = require("../../models/Token");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
const auth = require("../../middleware/auth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./Resumes",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage: storage,
});

sgMail.setApiKey(
  "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"
);

//@TEST ROUTE
//@GET User as per Pagination
router.get("/users/:page/:perPage", async (req, res) => {
  try {
    var page = parseInt(req.params.page);
    var perPage = parseInt(req.params.perPage);
    var users = await User.find();
    if (users.length == 0) {
      return res.json({ msg: "No Users Found!" });
    }
    if (perPage * page < users.length) {
      var user2 = await User.find()
        .limit(perPage + 1)
        .skip(perPage * page + 1);
    }
    user = await User.find()
      .limit(perPage)
      .skip(perPage * page);
    res.json(user);
  } catch (error) {
    console.log(error.message);
  }
});

//@Get Route
//@DESC Get user by Id
router.get("/details/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.json({ msg: "User not Found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "Please Enter a Valid ID" });
    }
  }
});

//@GET ROUTE
//@DEESC Get all the Users
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find({ banAccount: false });
    if (users.length == 0) {
      return res.json({ msg: "No Users Registered Yet" });
    }
    res.json(users);
  } catch (error) {
    console.log(error.message);
  }
});

//@POST Route
//@DESC User Signup or User(Client) creation
router.post("/", async (req, res) => {
  // Make sure this account doesn't already exist
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ msg: "User Already Exists" });
    }
    user = new User({
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
      Designation: req.body.Designation || "",
    });
    var token;
    var uID = crypto.randomBytes(16).toString("hex");
    var profile = new Profile({
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
      user: user.id,
    });
    await profile.save();
    await user.save(function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: err.message });
      }

      token = new Token({
        _userId: user._id,
        token: uID,
      });
      token.save(function (err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }

        var msg = {
          to: req.body.email,
          from: "vedant.pruthi.io@gmail.com",
          subject: "Verification Email for Account Creation",
          text: "Hey there, it’s our first message sent with Nodemailer ;) ",
          html:
            "<b>Hey there!" +
            req.body.name +
            "Please verify your account by clicking the link: http://" +
            req.headers.host + //React app hosting path will come here
            "/confirmation/" +
            token.token +
            ".\n",
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log("Email Sent", msg);
            res.json({ userData: user, uniqueToken: uID });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  } catch (error) {
    console.log(error);
  }
});

var fileUpload = upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "videoResume", maxCount: 1 },
]);

router.put("/update/:id", async (req, res) => {
  const {
    name,
    email,
    number,
    gender,
    address,
    about,
    linkdin,
    dob,
    maritalStatus,
    subscription,
    preferedWorkLocation,
  } = req.body;
  const userFields = {};
  var user = await User.findById(req.params.id);
  if (!user) {
    return res.json({ msg: "User Not Found!" });
  }

  console.log(typeof preferedWorkLocation);

  try {
    if (name) userFields.name = name;
    if (email) userFields.email = email;
    if (number) userFields.number = number;
    if (gender) userFields.gender = gender;
    if (address) userFields.address = address;
    if (about) userFields.about = about;
    if (linkdin) userFields.linkdin = linkdin;
    if (dob) userFields.dob = dob;
    if (maritalStatus) userFields.maritalStatus = maritalStatus;
    if (subscription) userFields.subscription = subscription;
    if (preferedWorkLocation)
      userFields.preferedWorkLocation = preferedWorkLocation;
    // userFields.resume = `http://${req.header.host}/Resume/${req.files.resume[0].filename}`;
    // userFields.videoResume = `http://${req.headers.host}/Resume/${req.files.videoResume[0].filename}`;
    user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: userFields },
      { new: true }
    );
    res.json({ msg: "User Updated", user: user });
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "Enter a Valid User ID Please!" });
    }
  }
});

// //@PUT Route
// //@DESC Update User Details
// router.put("/:id", async (req, res) => {
//   const { name, designation, email, number };
//   var userFields = {};
//   try {
//     if (name) userFields.name = name;
//     if (designation) userFields.designation = designation;
//     if (email) userFields.email;
//     if (number) userFields.number = number;

//     var user = await User.findOne({ _id: req.params.id });
//     userFields.savedJobs = user.savedJobs;
//     userFields.isVerified = user.isVerified;
//     userFields.banAccount = user.banAccount;
//     if (user) {
//       user = await User.findOneAndUpdate(
//         { _id: req.params.id },
//         { $set: userFields },
//         {
//           new: true,
//         }
//       );
//       return res.json({ msg: "User Updated!", data: user });
//     }
//   } catch (error) {}
// });

// //@PUT Route
// //@DESC Ban User
// router.put("/banAccount/:id", auth, async (req, res) => {
//   try {
//     const user = await User.findOne({ _id: req.params.id });
//     if (user) {
//       user = await User.findOneAndUpdate(
//         {
//           _id: req.params.id,
//         },
//         {
//           $set: { banAccount: true },
//         },
//         {
//           new: true,
//         }
//       );

//       var msg = {
//         to: user.email,
//         from: "vedant.pruthi.io@gmail.com",
//         subject: "Account Suspended Temporarily",
//         text: "Hey there, it’s our first message sent with Nodemailer ;) ",
//         html:
//           "<b>Hey there!" +
//           user.name +
//           " Your account has been Temporarily ban for Bad Usage. Thanks!",
//       };
//       sgMail
//         .send(msg)
//         .then(() => {
//           console.log("Email Sent", msg);
//           res.json({ userData: user, uniqueToken: uID });
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//       return res.json({ msg: "User banned", data: user });
//     }
//   } catch (error) {
//     console.log(error.message);
//     if (error.kind == "ObjectId") {
//       return res.json({ msg: "Please Enter a Valid ID" });
//     }
//   }
// });

router.put("/log", auth, async (req, res) => {
  var userFields = {
    lastLoggedIn: Date.now(),
  };
  try {
    var user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: userFields },
      {
        new: true,
      }
    );
    res.json({ msg: "User Logged in Updated", user: user });
  } catch (error) {
    console.log(error.message);
  }
});
//@Ban User
router.get("/banUser/:id", auth, async (req, res) => {
  try {
    var user = await User.findById(req.params.id);
    if (!user) {
      return res.json({ msg: "No User Found!" });
    }
    user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { banAccount: true } },
      { new: true }
    );
    res.json({ msg: "User Banned!" });
  } catch (error) {
    console.log(error.message);
  }
});

//@UnBan User
router.get("/unBanUser/:id", auth, async (req, res) => {
  try {
    var user = await User.findById(req.params.id);
    if (!user) {
      return res.json({ msg: "No User Found!" });
    }
    user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { banAccount: false } },
      { new: true }
    );
    res.json({ msg: "User UnBanned!" });
  } catch (error) {
    console.log(error.message);
  }
});

//@GET Route
router.get("/getBannedUser", auth, async (req, res) => {
  try {
    var users = await User.find({ banAccount: true });
    if (users.length == 0) {
      return res.json({ msg: "No Banned User!" });
    }
    res.json(users);
  } catch (error) {
    console.log(error.message);
  }
});

//@DELETE ROUTE
//@DESC DELETE User by ID
router.delete("/:id", auth, async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: "User Deleted!" });
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "Please Enter a Valid User ID" });
    }
  }
});

module.exports = router;
