const Company = require("../../models/Company");

const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const Jobs = require("../../models/Jobs");

const storage = multer.diskStorage({
  destination: "./Company",
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

//@GET Route
//@DESC GET DETAIL BY ID
router.get("/details/:id", async (req, res) => {
  try {
    let company = await Company.findById(req.params.id);
    if (!company) {
      return res.json({ msg: "No Companies Found!" });
    }

    res.json(company);
  } catch (error) {
    console.log(error.message);
  }
});

//@GET Route
//@DESC Get All the Companies
router.get("/all", async (req, res) => {
  try {
    var companies = await Company.find();

    if (companies.length == 0) {
      return res.json({ msg: "No Companies Found!" });
    }
    var cmp = companies.filter((company) => {
      if (Date.now() < company.Validity) {
        return company;
      }
    });
    if (cmp.length == 0) {
      return res.json({ msg: "No Companies Found!" });
    }
    res.json({ status: "success", cmp });
  } catch (error) {
    console.log(error.message);
  }
});

//@POST Route
//@DESC Create A Company
router.post("/create", upload.single("Logo"), async (req, res) => {
  const {
    CompanyName,
    CIN,
    CompanyDescription,
    JoiningDate,
    HeadOffice,
    OtherOffices,
    Validity,
    Website,
    CompanyEmail,
    CompanyContact,
    AboutCompany,
    CompanyHireRate,
  } = req.body;

  var companyFields = {
    PostedJobs: [],
  };
  try {
    if (CompanyContact) companyFields.CompanyContact = CompanyContact;
    if (CompanyHireRate) companyFields.CompanyHireRate = CompanyHireRate;
    if (AboutCompany) companyFields.AboutCompany = AboutCompany;
    if (CompanyEmail) companyFields.CompanyEmail = CompanyEmail;
    if (CompanyName) companyFields.CompanyName = CompanyName;
    if (CIN) companyFields.CIN = CIN;
    if (CompanyDescription)
      companyFields.CompanyDescription = CompanyDescription;
    if (JoiningDate) companyFields.JoiningDate = JoiningDate;
    if (HeadOffice) companyFields.HeadOffice = HeadOffice;
    if (OtherOffices) companyFields.OtherOffices = JSON.parse(OtherOffices);
    if (Validity) companyFields.Validity = Validity;
    if (Website) companyFields.Website = Website;
    if (req.file) {
      companyFields.Logo = `http://${req.headers.host}/Company/${req.file.filename}`;
    }
    const jobs = await Jobs.find({ CompanyName: req.body.CompanyName });
    if (jobs.length > 0) {
      companyFields.PostedJobs.push(jobs);
    }
    var company = await Company.findOne({ CIN: req.body.CIN });
    if (company) {
      await Company.findOneAndUpdate(
        { CIN: req.body.CIN },
        { $set: companyFields },
        { new: true }
      );
      return res.json({ msg: "Company Updated", company: company });
    }
    company = new Company(companyFields);
    await company.save();
    res.json({ msg: "Company Created!", company: company });
  } catch (error) {
    console.log(error.message);
  }
});

router.patch("/update/:id", upload.single("Logo"), async (req, res) => {
  const {
    CompanyName,
    CIN,
    CompanyDescription,
    JoiningDate,
    HeadOffice,
    OtherOffices,
    Validity,
    Website,
    CompanyEmail,
    CompanyContact,
    AboutCompany,
    CompanyHireRate,
  } = req.body;
  var companyFields = {};
  try {
    if (CompanyContact) companyFields.CompanyContact = CompanyContact;
    if (CompanyHireRate) companyFields.CompanyHireRate = CompanyHireRate;
    if (AboutCompany) companyFields.AboutCompany = AboutCompany;
    if (CompanyEmail) companyFields.CompanyEmail = CompanyEmail;
    if (CompanyName) companyFields.CompanyName = CompanyName;
    if (CIN) companyFields.CIN = CIN;
    if (CompanyDescription)
      companyFields.CompanyDescription = CompanyDescription;
    if (JoiningDate) companyFields.JoiningDate = JoiningDate;
    if (HeadOffice) companyFields.HeadOffice = HeadOffice;
    if (OtherOffices) companyFields.OtherOffices = JSON.parse(OtherOffices);
    if (Validity) companyFields.Validity = Validity;
    if (Website) companyFields.Website = Website;
    if (req.file) {
      companyFields.Logo = `http://${req.headers.host}/Company/${req.file.filename}`;
    }

    const company = await Company.findOneAndUpdate(
      { _id: req.params.id },
      { $set: companyFields },
      { new: true }
    );

    if (!company) {
      return res.json({ status: "failure" });
    }

    res.json({ status: "success", company });
  } catch (error) {
    console.log(error.message);
  }
});

//@DELETE Route
//@DESC Delete a Company By ID
router.delete("/delete/:id", async (req, res) => {
  try {
    await Company.findOneAndDelete(req.params.id);
    res.json({ msg: "Company Deleted!" });
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "Please Enter a Valid ID" });
    }
  }
});

//@Router GET InActive Employers
router.get("/inActive", async (req, res) => {
  try {
    var companies = await Company.find();
    if (companies.length == 0) {
      return res.json({ msg: "No Companies Found!" });
    }
    var cmps = companies.filter((company) => {
      if (Date.now() > company.Validity) {
        return company;
      }
    });
    if (cmps.length == 0) {
      return res.json({ status: "failure", msg: "No Companies Found!" });
    }
    res.json({ status: "success", cmps });
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
    // var users = await Company.find();
    // var len = users.length;
    // if (users.length == 0) {
    //   return res.json({ msg: "No Users Found!" });
    // }
    // if (perPage * page < users.length) {
    //   console.log(Date().now);
    //   var user2 = await Company.find({ Validity: { $gte: Date.now() } })
    //     .limit(perPage + 1)
    //     .skip(perPage * page + 1);
    // }
    // user = await Company.find()
    //   .limit(perPage)
    //   .skip(perPage * page);

    const page = req.params.page * 1 || 1;
    const limit = req.params.perPage * 1 || 10;
    const skip = (page - 1) * limit;

    const users = await Company.find({ Validity: { $gte: Date.now() } })
      .skip(skip)
      .limit(limit);

    res.json({ users });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
