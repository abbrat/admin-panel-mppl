const express = require("express");
const connectDB = require("./config/db");
const mailer = require("./NodeMailer");
const app = express();
const config = require("config");
const jwt = require("jsonwebtoken");
const Token = require("./models/Token");
const User = require("./models/User");
const multer = require("multer");
const path = require("path");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const MongoOplog = require("mongo-oplog");
const pdf = require("html-pdf");
const pdfTemplate = require("./templates");
const auth = require("./middleware/auth");
const cors = require("cors");

app.use(cors());

const methodOverride = require("method-override");
const Resume = require("./models/Resume");
const Profile = require("./models/Profile");

//Database Connection
connectDB();
app.use(express.json({ extended: false }));

app.use(methodOverride("_method"));

const storage = multer.diskStorage({
  destination: "./Resumes",
  filename: (req, file, cb) => {
    return cb(null, `${req.user.id}_Video_${path.extname(file.originalname)}`);
  },
});
const storage2 = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    return cb(null, `${req.user.id}_Image_${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
});

const upload2 = multer({
  storage: storage2,
});

// const oplog = MongoOplog(
//   "mongodb+srv://vedant1723:vedant1723@manglam.pvqte.mongodb.net/ManglamDB?retryWrites=true&w=majority"
// );
// oplog
//   .tail()
//   .then(() => {
//     console.log("Tailing Started");
//   })
//   .catch((err) => console.error(err));

// oplog.on("op", (data) => {
//   console.log("OP LOG ", data);
// });

// oplog.on("insert", (doc) => {
//   console.log("OP LOG ", doc);
// });

// oplog.on("update", (doc) => {
//   console.log("OP LOG ", doc);
// });

// oplog.on("delete", (doc) => {
//   console.log("OP LOG ", doc.o._id);
// });

app.use("/Notes", express.static(path.join(__dirname, "/Notes")));
app.use("/Resumes", express.static(path.join(__dirname, "/Resumes")));
app.use("/Company", express.static(path.join(__dirname, "/Company")));

//newly made
app.get("/verifytokens", auth, (req, res) => {
  if (req.user) {
    return res.json({ msg: true });
  }
  res.json({ msg: false });
});

app.post("/createVideo", auth, upload.single("file"), async (req, res) => {
  const { resumeTitle } = req.body;
  var resumeFields = {};
  resumeFields.user = req.user.id;
  try {
    if (resumeTitle) resumeFields.resumeTitle = resumeTitle;
    resumeFields.resumeVideo = `http://${req.headers.host}/${req.file.path}`;
    let details = await Resume.findOne({ user: req.user.id });
    if (details) {
      details = await Resume.findOneAndUpdate(
        { user: req.user.id },
        { $set: resumeFields },
        { new: true }
      );
      return res.json({ msg: "Resume Updated!" });
    }
    details = new Resume(resumeFields);
    await details.save();
    res.json(details);
    // res.json(req.file.path);
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/createDP", auth, upload2.single("file"), async (req, res) => {
  var profileFields = {};
  profileFields.user = req.user.id;
  try {
    var profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profileFields.userPhoto = `http://${req.headers.host}/${req.file.path}`;
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }
    res.json({ msg: "Profile not Created Yet" });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/getDP", auth, async (req, res) => {
  try {
    var profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      return res.json(profile.userPhoto);
    }
    res.json({ msg: "Profile not Created Yet" });
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/create-resume", auth, async (req, res) => {
  await pdf
    .create(pdfTemplate(req.body), {})
    .toFile("./Resumes/" + req.user.id + "_Resume.pdf", (err) => {
      if (err) {
        console.log(err.message);
        return;
      }
      res.json({
        msg: "Resume Generated Successfully!",
        linkToResume:
          "http://" +
          req.headers.host +
          "/Resumes/" +
          req.user.id +
          "_Resume.pdf",
      });
    });
});

//Initializing Middleware

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: "240487340980460",
      clientSecret: "9daf25b21a8321e46a692e36f37deae8",
      callbackURL: "http://localhost:3000",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

app.get("/auth/facebook", passport.authenticate("facebook"));

//Multer
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/confirmation/:token", async (req, res, next) => {
  console.log("Token", req.params);
  Token.findOne({ token: req.params.token }, (err, token) => {
    if (!token) {
      return res.status(400).send({
        type: "not-verified",
        msg:
          "We are unable to find a valid token. Your token may have expired!",
      });
    }
    User.findOne({ _id: token._userId }, (err, user) => {
      if (err) {
        return res.status(500).send({ msg: err.message });
      }
      if (user.isVerified) {
        return res.status(400).send({
          type: "already-verified",
          msg: "This user has already been verified",
        });
      }
      user.isVerified = true;
      user.save((err) => {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          {
            expiresIn: 360000,
          },
          (err, token) => {
            if (err) throw err;
            res.json({ msg: "OTP Successfully Verified!", tkn: token });
          }
        );
      });
    });
  });
});

//Routes
app.use("/api/consultant", require("./routes/api/consultant"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/consultant", require("./routes/api/consultant"));
app.use("/api/jobs", require("./routes/api/jobs"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/studynotes", require("./routes/api/studynotes"));
app.use("/api/test", require("./routes/api/test"));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/applications", require("./routes/api/application"));
app.use("/api/admin", require("./routes/api/admin"));
app.use("/api/notes", require("./routes/api/notes"));
app.use("/api/webinar", require("./routes/api/webinar"));
app.use("/api/company", require("./routes/api/company"));
app.use(
  "/api/webinarApplications",
  require("./routes/api/webinarApplications")
);
app.use("/api/resume", require("./routes/api/resume"));
app.use("/api/category", require("./routes/api/category"));
app.use("/api/subscription", require("./routes/api/subscription"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server Connected on Port:", PORT);
});
