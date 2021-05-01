const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const multer = require("multer");
const path = require("path");
const Profile = require("../../models/Profile");
const ProfessionalDetails = require("../../models/ProfessionalDetails");
const AcademicQualification = require("../../models/AcademicQualification");
const OtherPersonalDetails = require("../../models/OtherPersonalDetails");
const HigherQualification = require("../../models/HigherQualification");
const SocialConnects = require("../../models/SocialConnects");
const Resume = require("../../models/Resume");
// const storage = multer.diskStorage({
//   destination: "./Resumes",
//   filename: (req, file, cb) => {
//     return cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// const upload = multer({
//   storage: storage,
// });
const upload = multer();

//@GET Route
//@DESC Get your own Profile or get current user profile
router.get("/me", auth, async (req, res) => {
  try {
    var profile = await Profile.findOne({
      user: req.user.id,
    }).select("-userPhoto");
    const professional = await ProfessionalDetails.find({
      user: req.user.id,
    });
    const academic = await AcademicQualification.find({
      user: req.user.id,
    });
    const other = await OtherPersonalDetails.findOne({
      user: req.user.id,
    });
    const higherEducation = await HigherQualification.find({
      user: req.user.id,
    });
    const social = await SocialConnects.findOne({
      user: req.user.id,
    });
    const resume = await Resume.findOne({
      user: req.user.id,
    });
    if (
      !profile &&
      !professional &&
      !academic &&
      !other &&
      !higherEducation &&
      !social &&
      !resume
    ) {
      return res
        .status(400)
        .json({ msg: "User has not created his/her Profile Yet" });
    }
    if (profile.userPhoto) {
      res.json({
        profileData: profile,
        professionalData: professional,
        academicData: academic,
        otherData: other,
        higherEducationData: higherEducation,
        socialData: social,
        resumeData: resume,
      });
    }
    res.json({
      profileData: profile,
      professionalData: professional,
      academicData: academic,
      otherData: other,
      higherEducationData: higherEducation,
      socialData: social,
      resumeData: resume,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//@GET Route
//@DESC Get User Details By ID
router.get("/details/:id", auth, async (req, res) => {
  try {
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
    if (
      !profile &&
      !professional &&
      !academic &&
      !other &&
      !higherEducation &&
      !social &&
      !resume
    ) {
      return res
        .status(400)
        .json({ msg: "User has not created his/her Profile Yet" });
    }
    res.json({
      profileData: profile,
      professionalData: professional,
      academicData: academic,
      otherData: other,
      higherEducationData: higherEducation,
      socialData: social,
      resumeData: resume,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//@TEST Route
router.get("/photo", auth, async (req, res) => {
  try {
    var user = await Profile.findOne({ user: req.user.id });
    const data = Buffer.from(user.userPhoto).toString("base64");
    res.json(data);
  } catch (error) {
    console.log(error.message);
  }
});

//GET Route Test Route
router.get("/getResumeTest", auth, async (req, res) => {
  try {
    var resume = await Resume.findOne({ user: req.user.id });
    result = Buffer.from(resume.resumeFile).toString("base64");
    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

//@TEST Route 2
router.post("/resume", upload.single("resumeFile"), auth, async (req, res) => {
  const { resumeTitle } = req.body;
  var resumeFields = {};
  try {
    if (req.file) {
      resumeFields.resumeFile = req.file.buffer;
      resumeFields.resumeFile.contentType = req.file.mimetype;
    }
    resumeFields.resumeTitle = resumeTitle;
    resumeFields.user = req.user.id;
    var resume = new Resume(resumeFields);
    await resume.save();
    res.json(resume);
  } catch (error) {
    console.log(error.message);
  }
});

//@POST Route
//@DESC Upload user Photo
router.post(
  "/uploadPic",
  auth,
  upload.single("userPhoto"),
  async (req, res) => {
    var profileFields = {};
    try {
      if (req.file) {
        profileFields.userPhoto = req.file.buffer;
        profileFields.userPhoto.contentType = req.file.mimetype;
      }
      var profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      res.json({ msg: "User Picture Uploaded" });
    } catch (error) {
      console.log(error.message);
    }
  }
);

// @POST Route
// @DESC Create the current user Personal Data Profile
// @ TO_DO upload.single("image")
router.post("/", auth, async (req, res) => {
  const {
    name,
    email,
    number,
    gender,
    dateOfBirth,
    passportNumber,
    expectedSalary,
    noticePeriod,
    currentLocation,
    preferredLocation,
    currentSalary,
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
    country,
    skills,
    languages,
    additionalSkills,
    aboutUser,
    maritalStatus,
  } = req.body;

  //Profile Object
  const profilefields = {};
  profilefields.user = req.user.id;
  try {
    if (gender) profilefields.gender = gender;
    if (name) profilefields.name = name;
    if (email) profilefields.email = email;
    if (number) profilefields.number = number;
    if (dateOfBirth) profilefields.dateOfBirth = dateOfBirth;
    if (passportNumber) profilefields.passportNumber = passportNumber;
    if (expectedSalary) profilefields.expectedSalary = expectedSalary;
    if (noticePeriod) profilefields.noticePeriod = noticePeriod;
    if (currentLocation) profilefields.currentLocation = currentLocation;
    if (preferredLocation) profilefields.preferredLocation = preferredLocation;
    if (currentSalary) profilefields.currentSalary = currentSalary;
    if (addressLine1) profilefields.addressLine1 = addressLine1;
    if (addressLine2) profilefields.addressLine2 = addressLine2;
    if (city) profilefields.city = city;
    if (state) profilefields.state = state;
    if (pincode) profilefields.pincode = pincode;
    if (skills) {
      profilefields.skills = skills;
    }
    if (languages) {
      profilefields.languages = languages;
    }
    if (country) profilefields.country = country;
    if (additionalSkills) profilefields.additionalSkills = additionalSkills;
    if (aboutUser) profilefields.aboutUser = aboutUser;
    if (maritalStatus) profilefields.maritalStatus = maritalStatus;
    // profilefields.userPhoto = `http://${req.headers.host}/Resumes/${req.file.filename}`;

    if (Profile.findOne({ user: req.user.id })) {
      var pro = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profilefields },
        { new: true }
      ).select("-userPhoto");
      return res.json({ msg: "User Profile Updated", pro });
    }
    let profile = new Profile(profilefields);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//@PUT Route
//@DESC Update the Personal Data
//@TO_DO upload.single("image")
router.put("/updateProfile/:id", auth, async (req, res) => {
  const {
    name,
    email,
    number,
    gender,
    dateOfBirth,
    passportNumber,
    expectedSalary,
    noticePeriod,
    currentLocation,
    preferredLocation,
    currentSalary,
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
    country,
    skills,
    languages,
    additionalSkills,
    aboutUser,
    maritalStatus,
  } = req.body;

  //Profile Object
  const profilefields = {};
  profilefields.user = req.user.id;
  try {
    if (gender) profilefields.gender = gender;
    if (name) profilefields.name = name;
    if (email) profilefields.email = email;
    if (number) profilefields.number = number;
    if (dateOfBirth) profilefields.dateOfBirth = dateOfBirth;
    if (passportNumber) profilefields.passportNumber = passportNumber;
    if (expectedSalary) profilefields.expectedSalary = expectedSalary;
    if (noticePeriod) profilefields.noticePeriod = noticePeriod;
    if (currentLocation) profilefields.currentLocation = currentLocation;
    if (preferredLocation) profilefields.preferredLocation = preferredLocation;
    if (currentSalary) profilefields.currentSalary = currentSalary;
    if (addressLine1) profilefields.addressLine1 = addressLine1;
    if (addressLine2) profilefields.addressLine2 = addressLine2;
    if (city) profilefields.city = city;
    if (state) profilefields.state = state;
    if (pincode) profilefields.pincode = pincode;
    if (skills) {
      profilefields.skills = skills;
    }
    if (languages) {
      profilefields.languages = languages;
    }
    if (country) profilefields.country = country;
    if (additionalSkills) profilefields.additionalSkills = additionalSkills;
    if (aboutUser) profilefields.aboutUser = aboutUser;
    if (maritalStatus) profilefields.maritalStatus = maritalStatus;
    profilefields.lastUpdate = Date.now();
    // profilefields.userPhoto = `http://${req.headers.host}/uploads/${req.file.filename}`;
    let profile = await Profile.findOne({
      _id: req.params.id,
    });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profilefields },
        { new: true }
      );
      return res.json(profilefields);
    } else {
      return res.json({ msg: "Enter the Valid Profile ID" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//@POST Route
//@DESC create the Professional Details of the User
router.post("/createProfessionalDetails", auth, async (req, res) => {
  const {
    experienceFrom,
    experienceTo,
    annualSalary,
    designation,
    employer,
    functionalArea,
    role,
    industry,
    currentlyWorking,
  } = req.body;

  //Professional Details Object
  const professionalDetailsObject = {};
  professionalDetailsObject.user = req.user.id;
  try {
    if (experienceFrom)
      professionalDetailsObject.experienceFrom = experienceFrom;
    if (experienceTo) professionalDetailsObject.experienceTo = experienceTo;
    if (annualSalary) professionalDetailsObject.annualSalary = annualSalary;
    if (designation) professionalDetailsObject.designation = designation;
    if (employer) professionalDetailsObject.employer = employer;
    if (functionalArea)
      professionalDetailsObject.functionalArea = functionalArea;
    if (role) professionalDetailsObject.role = role;
    if (industry) professionalDetailsObject.industry = industry;
    professionalDetailsObject.currentlyWorking = currentlyWorking;

    // if (ProfessionalDetails.findOne({ user: req.user.id })) {
    //   return res.json({
    //     msg: "User Professional Details has already been created!",
    //   });
    // }

    details = new ProfessionalDetails(professionalDetailsObject);
    await details.save();
    res.json(professionalDetailsObject);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//@Put Route
//@DESC update the Professional Details of the User
router.put("/updateProfessionalDetails/:id", auth, async (req, res) => {
  const {
    experienceFrom,
    experienceTo,
    annualSalary,
    designation,
    employer,
    functionalArea,
    role,
    industry,
    currentlyWorking,
  } = req.body;

  //Professional Details Object
  const professionalDetailsObject = {};
  var profileFields = {
    lastUpdate: Date.now(),
  };
  professionalDetailsObject.user = req.user.id;
  try {
    if (experienceFrom)
      professionalDetailsObject.experienceFrom = experienceFrom;
    if (experienceTo) professionalDetailsObject.experienceTo = experienceTo;
    if (annualSalary) professionalDetailsObject.annualSalary = annualSalary;
    if (designation) professionalDetailsObject.designation = designation;
    if (employer) professionalDetailsObject.employer = employer;
    if (functionalArea)
      professionalDetailsObject.functionalArea = functionalArea;
    if (role) professionalDetailsObject.role = role;
    if (industry) professionalDetailsObject.industry = industry;

    professionalDetailsObject.currentlyWorking = currentlyWorking;
    await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true }
    );

    let details = await ProfessionalDetails.findById(req.params.id);
    if (details) {
      details = await ProfessionalDetails.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $set: professionalDetailsObject,
        },
        {
          new: true,
        }
      );
      return res.json(professionalDetailsObject);
    } else {
      return res.json({ msg: "Enter the Valid Professional Details ID" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//@POST Route
//@DESC Create Academic Details of the User
router.post("/createAcademicDetails", auth, async (req, res) => {
  const {
    qualification,
    boardOrUniversity,
    passingYear,
    percentage,
  } = req.body;

  const academicDetails = {};
  academicDetails.user = req.user.id;

  try {
    if (qualification) academicDetails.qualification = qualification;
    if (boardOrUniversity)
      academicDetails.boardOrUniversity = boardOrUniversity;
    if (passingYear) academicDetails.passingYear = passingYear;
    if (percentage) academicDetails.percentage = percentage;

    details = new AcademicQualification(academicDetails);
    details.save();
    res.json(academicDetails);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//@PUT Route
//@DESC Update Academic Details of the User
router.put("/updateAcademicDetails/:id", auth, async (req, res) => {
  const {
    qualification,
    boardOrUniversity,
    passingYear,
    percentage,
  } = req.body;

  const academicDetails = {};
  academicDetails.user = req.user.id;

  var profileFields = {
    lastUpdate: Date.now(),
  };

  try {
    if (qualification) academicDetails.qualification = qualification;
    if (boardOrUniversity)
      academicDetails.boardOrUniversity = boardOrUniversity;
    if (passingYear) academicDetails.passingYear = passingYear;
    if (percentage) academicDetails.percentage = percentage;

    await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true }
    );

    let details = await AcademicQualification.findById(req.params.id);
    if (details) {
      details = await AcademicQualification.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $set: academicDetails,
        },
        {
          new: true,
        }
      );
      return res.json(academicDetails);
    } else {
      return res.json({ msg: "Enter the Valid Academic Qualification ID!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//@POST Route
//@DESC Create Other Personal Details
router.post("/createOtherPersonalDetails", auth, async (req, res) => {
  const {
    maritalStatus,
    nationality,
    workPhone,
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
    country,
  } = req.body;

  //Other Personal Details Object
  const otherPersonal = {};
  otherPersonal.user = req.user.id;
  try {
    if (maritalStatus) otherPersonal.maritalStatus = maritalStatus;
    if (nationality) otherPersonal.nationality = nationality;
    if (workPhone) otherPersonal.workPhone = workPhone;
    if (addressLine1) otherPersonal.addressLine1 = addressLine1;
    if (addressLine2) otherPersonal.addressLine2 = addressLine2;
    if (city) otherPersonal.city = city;
    if (state) otherPersonal.state = state;
    if (pincode) otherPersonal.pincode = pincode;
    if (country) otherPersonal.country = country;

    let details = await OtherPersonalDetails.findOne({ user: req.user.id });
    if (details) {
      return res.json({ msg: "Other Personal Details has already created!" });
    }
    details = new OtherPersonalDetails(otherPersonal);
    await details.save();
    res.json(otherPersonal);
  } catch (error) {
    console.log(error.message);
  }
});

//@PUT Route
//@DESC Update Other Personal Details
router.put("/updateOtherPersonalDetails", auth, async (req, res) => {
  const {
    maritalStatus,
    nationality,
    workPhone,
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
    country,
  } = req.body;

  //Other Personal Details Object
  const otherPersonal = {};
  var profileFields = {
    lastUpdate: Date.now,
  };
  otherPersonal.user = req.user.id;
  try {
    if (maritalStatus) otherPersonal.maritalStatus = maritalStatus;
    if (nationality) otherPersonal.nationality = nationality;
    if (workPhone) otherPersonal.workPhone = workPhone;
    if (addressLine1) otherPersonal.addressLine1 = addressLine1;
    if (addressLine2) otherPersonal.addressLine2 = addressLine2;
    if (city) otherPersonal.city = city;
    if (state) otherPersonal.state = state;
    if (pincode) otherPersonal.pincode = pincode;
    if (country) otherPersonal.country = country;

    await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true }
    );
    let details = await OtherPersonalDetails.findOne({ user: req.user.id });
    if (details) {
      details = await OtherPersonalDetails.findOneAndUpdate(
        {
          user: req.user.id,
        },
        {
          $set: otherPersonal,
        },
        {
          new: true,
        }
      );
      return res.json(otherPersonal);
    } else {
      return res.json({ msg: "Enter the Valid Other Personal Details ID" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

//@POST Route
//@DESC Create Higher Qualifications of the User
router.post("/createHigherQualification", auth, async (req, res) => {
  const { qualification, institute, specialization, passingYear } = req.body;
  const higherDetails = {};
  higherDetails.user = req.user.id;
  try {
    if (qualification) higherDetails.qualification = qualification;
    if (institute) higherDetails.institute = institute;
    if (specialization) higherDetails.specialization = specialization;
    if (passingYear) higherDetails.passingYear = passingYear;

    details = new HigherQualification(higherDetails);
    details.save();
    res.json(higherDetails);
  } catch (error) {
    console.log(error.message);
  }
});

//@PUT Route
//@DESC Update Higher Qualifications of the User
router.post("/updateHigherQualification/:id", auth, async (req, res) => {
  const { qualification, institute, specialization, passingYear } = req.body;
  var higherDetails = {};
  higherDetails.user = req.user.id;
  var profileFields = {
    lastUpdate: Date.now,
  };
  try {
    if (qualification) higherDetails.qualification = qualification;
    if (institute) higherDetails.institute = institute;
    if (specialization) higherDetails.specialization = specialization;
    if (passingYear) higherDetails.passingYear = passingYear;

    await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true }
    );

    let details = await HigherQualification.findOne({ _id: req.params.id });
    if (details) {
      details = await HigherQualification.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $set: higherDetails,
        },
        {
          new: true,
        }
      );
      return res.json(higherDetails);
    } else {
      return res.json({ msg: "Enter the Valid Higher Qualification ID" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

//@POST Route
//@DESC Create Social Connects of the User
router.post("/createSocialConnects", auth, async (req, res) => {
  const { linkdIn, skype, googleChat, googleDuo } = req.body;
  const socialFields = {};
  socialFields.user = req.user.id;
  try {
    if (linkdIn) socialFields.linkdIn = linkdIn;
    if (skype) socialFields.skype = skype;
    if (googleChat) socialFields.googleChat = googleChat;
    if (googleDuo) socialFields.googleDuo = googleDuo;

    let details = await SocialConnects.findOne({ user: req.user.id });
    if (details) {
      return res.json({ msg: "Social Connects Services has already created!" });
    }
    details = new SocialConnects(socialFields);
    await details.save();
    res.json(socialFields);
  } catch (error) {
    console.log(error.message);
  }
});

//@GET ROUTE
//@DESC Get Resume
router.get("/resume", auth, async (req, res) => {
  try {
    var resume = await Resume.findOne({ user: req.user.id });
    if (!resume) {
      return res.json({ msg: "Resume not Created Yet!" });
    }
    res.json(resume);
  } catch (error) {
    console.log(error.message);
  }
});

//@PUT Route
//@DESC Update Social Connects of the User
router.post("/updateSocialConnects/:id", auth, async (req, res) => {
  const { linkdIn, skype, googleChat, googleDuo } = req.body;
  const socialFields = {};
  socialFields.user = req.user.id;
  try {
    if (linkdIn) socialFields.linkdIn = linkdIn;
    if (skype) socialFields.skype = skype;
    if (googleChat) socialFields.googleChat = googleChat;
    if (googleDuo) socialFields.googleDuo = googleDuo;

    let details = await SocialConnects.findOne({ _id: req.params.id });
    if (details) {
      details = await SocialConnects.findOneAndUpdate(
        {
          user: req.user.id,
        },
        {
          $set: socialFields,
        },
        {
          new: true,
        }
      );
      return res.json(socialFields);
    } else {
      return res.json({ msg: "Enter the valid Social Connects ID" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

//@POST Create the Resume's of the current User
var fileUpload = upload.fields([
  { name: "file", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);
router.post("/createResume", [auth, fileUpload], async (req, res) => {
  console.log("Print:", req.files.video[0].filename);
  const { resumeTitle } = req.body;
  const resumeFields = {};
  resumeFields.user = req.user.id;
  try {
    if (resumeTitle) resumeFields.resumeTitle = resumeTitle;
    if (req.files.video[0].size > 31457280) {
      return res.json({ msg: "Video cannot be more than 30 MB" });
    }

    resumeFields.resumeFile = `http://${req.headers.host}/uploads/${req.files.file[0].filename}`;
    resumeFields.resumeVideo = `http://${req.headers.host}/uploads/${req.files.video[0].filename}`;

    let details = await Resume.findOne({ user: req.user.id });
    if (details) {
      return res.json({
        msg: "User has already created the resume Section!",
      });
    }
    details = new Resume(resumeFields);
    await details.save();
    res.json(details);
  } catch (error) {
    console.log(error.message);
  }
});

//@PUT Update the Resume's of the current User
router.put("/updateResume/:id", [auth, fileUpload], async (req, res) => {
  const { resumeTitle } = req.body;
  const resumeFields = {};
  resumeFields.user = req.user.id;

  try {
    if (resumeTitle) resumeFields.resumeTitle = resumeTitle;

    if (req.files.video[0].size > 31457280) {
      return res.json({ msg: "Video cannot be more than 30 MB" });
    }
    resumeFields.resumeFile = `http://${req.headers.host}/uploads/${req.files.file[0].filename}`;
    resumeFields.resumeVideo = `http://${req.headers.host}/uploads/${req.files.video[0].filename}`;

    let details = await Resume.findOne({ _id: req.params.id });
    if (details) {
      details = await Resume.findOneAndUpdate(
        {
          user: req.user.id,
        },
        { $set: resumeFields },
        { new: true }
      );
      return res.json(resumeFields);
    } else {
      return res.json({ msg: "Enter the Valid Resume ID" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

//@DELETE Route
//@DESC Deleete Professional Details
router.delete("/deleteProfessional/:id", auth, async (req, res) => {
  try {
    await ProfessionalDetails.findByIdAndDelete(req.params.id);
    res.json({ msg: "Professional Details Removed!" });
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "Enter A Valid ID" });
    }
  }
});
//@DELETE Route
//@DESC Deleete Academic Details
router.delete("/deleteAcademic/:id", auth, async (req, res) => {
  try {
    await AcademicQualification.findByIdAndDelete(req.params.id);
    res.json({ msg: "Academic Details Removed!" });
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "Enter A Valid ID" });
    }
  }
});
//@DELETE Route
//@DESC Delete Higher Education Details
router.delete("/deleteHigherEducation/:id", auth, async (req, res) => {
  try {
    await HigherQualification.findByIdAndDelete(req.params.id);
    res.json({ msg: "Higher Education Details Removed!" });
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "Enter A Valid ID" });
    }
  }
});

module.exports = router;
