const express = require("express");
const Consultant = require("../../models/Consultant");
const router = express.Router();

/*
 * @Description GET all Consultants
 */
router.get("/", async (req, res) => {
  try {
    const consultant = await Consultant.find({ banAccount: false });
    if (consultant.length == 0) {
      return res.json({ msg: "No Consultants Yet" });
    }
    res.json(consultant);
  } catch (error) {
    console.log(error.message);
  }
});

//@POST Create Consultants
router.post("/createConsultant", async (req, res) => {
  const {
    name,
    sector,
    about,
    membershipDate,
    educationInfo,
    experience,
    email,
  } = req.body;
  var consultantFields = {};
  try {
    if (name) consultantFields.name = name;
    if (email) consultantFields.email = email;
    if (sector) consultantFields.sector = sector;
    if (about) consultantFields.about = about;
    if (membershipDate) consultantFields.membershipDate = membershipDate;
    if (educationInfo) consultantFields.educationInfo = educationInfo;
    if (experience) consultantFields.experience = experience;
    var consultant = await Consultant.findOne({ email });
    if (consultant) {
      return res.json({ msg: "Consultants already Created!" });
    }
    consultant = new Consultant(consultantFields);
    await consultant.save();
    res.json({ msg: "Consultant Created", consultant: consultant });
  } catch (error) {
    console.log(error.message);
  }
});

//@PUT Update Consultants
router.put("/updateConsultant/:id", async (req, res) => {
  console.log(req.body);
  const {
    name,
    sector,
    about,
    membershipDate,
    educationInfo,
    experience,
    email,
  } = req.body;
  var consultantFields = {};
  try {
    if (name) consultantFields.name = name;
    if (email) consultantFields.email = email;
    if (sector) consultantFields.sector = sector;
    if (about) consultantFields.about = about;
    if (membershipDate) consultantFields.membershipDate = membershipDate;
    if (educationInfo) consultantFields.educationInfo = educationInfo;
    if (experience) consultantFields.experience = experience;
    var consultant = await Consultant.findById(req.params.id);
    if (!consultant) {
      return res.json({ msg: "Consultants Not Created YET!" });
    }
    consultant = await Consultant.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: consultantFields,
      },
      {
        new: true,
      }
    );
    res.json({ success: "Consultant Updated", consultant: consultant });
  } catch (error) {
    console.log(error.message);
  }
});

//@DELETE Consultant by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    await Consultant.findByIdAndDelete(req.params.id);
    res.json({ msg: "Consultant Removed!" });
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "Invalid Consultant ID" });
    }
  }
});

//@GET Ban Consultant
router.get("/banConsultant/:id", async (req, res) => {
  try {
    var consultant = await Consultant.findById(req.params.id);
    if (!consultant) {
      return res.json({ msg: "No Consultant Found!" });
    }
    consultant = await Consultant.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { banAccount: true } },
      { new: true }
    );
    res.json({ msg: "Consultant Banned!" });
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "Please Enter A valid ID" });
    }
  }
});
//@GET UnBan Consultant
router.get("/unBanConsultant/:id", async (req, res) => {
  try {
    var consultant = await Consultant.findById(req.params.id);
    if (!consultant) {
      return res.json({ msg: "No Consultant Found!" });
    }
    consultant = await Consultant.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { banAccount: false } },
      { new: true }
    );
    res.json({ msg: "Consultant unBanned!" });
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "Please Enter A valid ID" });
    }
  }
});

//@GET Banned Consultants
router.get("/bannedConsultants", async (req, res) => {
  try {
    const consultants = await Consultant.find({ banAccount: true });
    if (consultants.length == 0) {
      return res.json({ msg: "No Consultants Yet" });
    }
    res.json({ consultants });
  } catch (error) {
    console.log(error.message);
  }
});

//@TEST ROUTE
//@GET User as per Pagination
router.get("/users/:page/:perPage", async (req, res) => {
  try {
    // var page = parseInt(req.params.page);
    // var perPage = parseInt(req.params.perPage);
    // var users = await Consultant.find();
    // var len = users.length;
    // if (users.length == 0) {
    //   return res.json({ msg: "No Users Found!" });
    // }
    // if (perPage * page < users.length) {
    //   var user2 = await Consultant.find()
    //     .limit(perPage + 1)
    //     .skip(perPage * page + 1);
    // }
    // user = await Consultant.find()
    //   .limit(perPage)
    //   .skip(perPage * page);

    const page = req.params.page * 1 || 1;
    const limit = req.params.perPage * 1 || 10;
    const skip = (page - 1) * limit;

    const consultants = await Consultant.find({ banAccount: false })
      .skip(skip)
      .limit(limit);

    res.json({ consultants });
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;
