const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Applications = require("../../models/Applications");
const Jobs = require("../../models/Jobs");
const User = require("../../models/User");
const sgMail = require("@sendgrid/mail");
const Company = require("../../models/Company");
const moment = require("moment");
const JobQuestions = require("../../models/JobQuestions");
const SavedJobs = require("../../models/SavedJobs");
// sgMail.setApiKey(
//   "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"
// );

//@DESC Create Job
router.post("/", async (req, res) => {
  const {
    CompanyName,
    Designation,
    ContactPerson,
    ContactNumber,
    Positions,
    ContactEmail,
    JobTitle,
    JobType,
    Qualification,
    Experience,
    ExpectedCTC,
    Industry,
    KeySkills,
    Location,
    PublishType,
    Remarks,
    Validity,
    Description,
    SalaryRange,
    Distance,
    PreviousExp,
    CompanyHireRate,
    CompanyMemberSince,
    Category,
    Questions,
    PostingType,
  } = req.body;
  const jobFields = {};
  try {
    if (Category) jobFields.Category = Category;
    if (Positions) jobFields.Positions = Positions;
    if (SalaryRange) jobFields.SalaryRange = SalaryRange;
    if (Validity) jobFields.Validity = Validity;
    if (Distance) jobFields.Distance = Distance;
    if (PreviousExp) jobFields.PreviousExp = PreviousExp;
    if (CompanyHireRate) jobFields.CompanyHireRate = CompanyHireRate;
    if (CompanyMemberSince) jobFields.CompanyMemberSince = CompanyMemberSince;
    if (CompanyName) jobFields.CompanyName = CompanyName;
    if (Description) jobFields.Description = Description;
    if (Designation) jobFields.Designation = Designation;
    if (ContactPerson) jobFields.ContactPerson = ContactPerson;
    if (ContactNumber) jobFields.ContactNumber = ContactNumber;
    if (JobTitle) jobFields.JobTitle = JobTitle;
    if (JobType) jobFields.JobType = JobType;
    if (Qualification) jobFields.Qualification = Qualification;
    if (Experience) jobFields.Experience = Experience;
    if (ExpectedCTC) jobFields.ExpectedCTC = ExpectedCTC;
    if (Industry) jobFields.Industry = Industry;
    if (Questions) jobFields.Questions = Questions;
    if (KeySkills) {
      jobFields.KeySkills = KeySkills;
    }
    if (PostingType) jobFields.PostingType = PostingType;

    if (ContactEmail) jobFields.ContactEmail = ContactEmail;
    if (PublishType) jobFields.PublishType = PublishType;

    if (Location) jobFields.Location = Location;
    if (Remarks) jobFields.Remarks = Remarks;
    if (CompanyName) jobFields.CompanyName = CompanyName;

    console.log(("Location", jobFields.Location));
    var company = await Company.findOne({ CompanyName: CompanyName });
    if (company) {
      console.log(company);
      jobFields.Logo = company.Logo;
      var job = new Job(jobFields);
      await job.save();
      return res.json({ msg: "Job Created", job: job });
    } else {
      return res.json({ msg: "Create the Company First" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

//@GET Route
//@DESC Get Jobs by Date
//2021-03-01T04:16:17.873Z
router.post("/allJobs", async (req, res) => {
  try {
    var job = await Jobs.find();
    if (job.length == 0) {
      return res.json({ msg: "Jobs Not Created Yet!" });
    }
    var jobs = [];
    jobs = job.filter((job) => {
      if (
        req.body.date <= moment(job.date).format("YYYY-MM-DD, HH:mm:ss") &&
        Date.now() < job.Validity
      ) {
        return job;
      }
    });
    if (req.body.date == "") {
      return res.json(job);
    }
    if (jobs.length == 0) {
      return res.json({ msg: "No Updated Jobs" });
    }
    res.json(jobs);
  } catch (error) {
    console.log(error.message);
  }
});

//@ADMIN Route
router.get("/unApprovedJobs", auth, async (req, res) => {
  try {
    const job = await Job.find({ jobStatus: "Not Approved" });
    if (job.length == 0) {
      return res.json({ msg: "There is No UnApproved Jobs!" });
    }
    res.json({ status: "success", jobs: job });
  } catch (error) {
    console.log(error.message);
  }
});

//@GET Question by Job ID
router.get("/questions/:id", auth, async (req, res) => {
  try {
    var ques = await JobQuestions.find({ jobID: req.params.id });
    if (ques.length == 0) {
      return res.json({
        msg: "No Questions for this Job you can Apply it Directly",
      });
    }
    res.json(ques);
  } catch (error) {
    console.log(error.message);
  }
});

//@GET Job Questions
router.get("/jobQuestion/:id", async (req, res) => {
  try {
    var ques = await JobQuestions.find({ jobID: req.params.id });
    if (ques.length == 0) {
      return res.json({ msg: "Job Questions Not Craeted Yet!" });
    }
    res.json(ques);
  } catch (error) {
    console.log(error.message);
  }
});

//@POST Answers to Questions
router.post("/answer/:id", auth, async (req, res) => {
  const { answer } = req.body;
  var quesObj = {
    User: req.user.id,
    Answer: answer,
    isDone: true,
  };
  try {
    var ques = await JobQuestions.findById(req.params.id);
    if (!ques) {
      return res.json({ msg: "Enter a Valid Question ID" });
    }
    var arr = ques.Answer;
    arr.push(quesObj);
    ques = await JobQuestions.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { Answer: arr } },
      { new: true }
    );
    res.json({ msg: "Response Sent!" });
  } catch (error) {
    console.log(error.message);
  }
});
//@Create Job Questions
router.post("/jobQuestion/:id", async (req, res) => {
  const { question } = req.body;
  try {
    var job = await Jobs.findById(req.params.id);
    if (!job) {
      return res.json({ msg: "Enter the Valid JOb Id" });
    }
    var jobQues = new JobQuestions({
      Question: question,
      jobID: req.params.id,
    });
    await jobQues.save();
  } catch (error) {
    console.log(error.message);
  }
});

//@ADMIN Route
router.get("/approve/:id", auth, async (req, res) => {
  try {
    var job = await Job.findOne({ _id: req.params.id });

    if (!job) {
      return res.json({ msg: "Wrong JOB ID" });
    }
    if (job) {
      if (job.jobStatus == "Approved") {
        return res.json({ msg: "Job is Already Approved. Thanks!" });
      }
      job = await Job.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $set: {
            jobStatus: "Approved",
          },
        },
        {
          new: true,
        }
      );
      // const msg = {
      //   to: job.ContactEmail,
      //   from: "vedant.pruthi.io@gmail.com",
      //   subject: "Job Approved",
      //   text: "First Message via Send Grid",
      //   html:
      //     "<b>Hey there</b>" +
      //     job.ContactPerson +
      //     " Your Job is Approved and now Public to Everyone!" +
      //     "<br>Thankyou For Using Mangalam Services",
      // };

      // sgMail
      //   .send(msg)
      //   .then(() => {
      //     console.log("Email Sent", msg);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      return res.json({ msg: "Job Approved", data: job });
    }
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.status(404).json({ msg: "Wrong Job ID" });
    }
  }
});

router.get("/featuredJob", async (req, res) => {
  try {
    const jobs = await Jobs.find({ Featured: true }).sort({ date: -1 });
    if (jobs.length == 0) {
      return res.json({ msg: "No Featured Jobs Posted!" });
    }
    var mJobs = jobs.filter((job) => {
      return job.jobStatus == "Not Approved";
    });
    res.json(mJobs);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/all", async (req, res) => {
  try {
    const jobs = await Jobs.find();
    if (jobs.length == 0) {
      return res.json({ msg: "No Jobs Posted Yet" });
    }
    var mJobs = jobs.filter((job) => {
      if (job.jobStatus === "Approved" && Date.now() < job.Validity) {
        return job;
      }
    });
    if (mJobs.length == 0) {
      return res.json({ msg: "No Jobs" });
    }
    res.json({ status: "success", mJobs });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/jobType/:job", (req, res) => {
  Jobs.find({ JobType: req.params.job })
    .sort({ date: -1 })
    .then((jobs) => res.json(jobs))
    .catch((err) => res.json(err));
});

router.get("/details/:id", async (req, res) => {
  try {
    const job = await Jobs.findOne({ _id: req.params.id });
    if (!job) {
      return res.json({ msg: "Wrong ID" });
    }
    res.json(job);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/apply/:id", auth, async (req, res) => {
  try {
    const jobDetail = await Jobs.findOne({ _id: req.params.id });
    if (!jobDetail) {
      return res.json({ msg: "Wrong Job ID" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.json({ msg: "User Doesnt Exists!" });
    } else if (user) {
      if (user.subscription == "Premium") {
        var applicationFields = {};
        applicationFields.userID = req.user.id;
        applicationFields.jobDetail = jobDetail;

        const application = new Applications(applicationFields);
        await application.save();
        const msg = {
          to: user.email + "",
          from: "vedant.pruthi.io@gmail.com",
          subject: "Job Applied Successfully",
          text: "First Message via Send Grid",
          html:
            "<b>Hey there</b>" +
            user.name +
            " Thankyou for Applyying" +
            "Your Application ID is :" +
            application.id +
            "<br>Thankyou For Using Mangalam Services",
        };

        sgMail
          .send(msg)
          .then(() => {
            console.log("Email Sent", msg);
          })
          .catch((error) => {
            console.log(error);
          });

        return res.json({ msg: "Job Applied SuccessFully", data: application });
      } else {
        const applications = await Applications.find({ userID: req.user.id });
        if (applications.length > 1) {
          return res.json({
            msg:
              "You cant apply to this anymore as your plan Doesnt Support this!",
          });
        } else {
          var applicationFields = {};
          applicationFields.userID = req.user.id;
          applicationFields.jobDetail = jobDetail;

          const application = new Applications(applicationFields);
          await application.save();
          // const msg = {
          //   to: user.email,
          //   from: "vedant.pruthi.io@gmail.com",
          //   subject: "Job Applied Successfully",
          //   text: "First Message via Send Grid",
          //   html:
          //     "<b>Hey there</b>" +
          //     user.name +
          //     " Thankyou for Applyying" +
          //     "Your Application ID is :" +
          //     application.id +
          //     "<br>Thankyou For Using Mangalam Services",
          // };

          // sgMail
          //   .send(msg)
          //   .then(() => {
          //     console.log("Email Sent", msg);
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });

          return res.json({
            msg: "Job Applied SuccessFully",
            data: application,
          });
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }
});

//@GET Saved Jobs
router.get("/getSavedJobs", auth, async (req, res) => {
  try {
    const savedJobs = await SavedJobs.find({ user: req.user.id });
    if (savedJobs.length == 0) {
      return res.json({ msg: "No Saved Jobs by the User!" });
    }
    res.json(savedJobs);
  } catch (error) {
    console.log(error.message);
  }
});

//@Save Job
router.get("/saveJob/:id", auth, async (req, res) => {
  try {
    const job = await Jobs.findOne({ _id: req.params.id });
    if (!job) {
      return res.json({ msg: "Wrong Job ID" });
    }
    var company = await Company.findOne({ CompanyName: job.CompanyName });
    var saveJob = await SavedJobs.findOne({ jobID: req.params.id });
    if (saveJob) {
      return res.json({ msg: "Job Already Saved!" });
    } else {
      saveJob = new SavedJobs({
        user: req.user.id,
        jobID: req.params.id,
        jobTitle: job.jobTitle,
        CompanyName: job.CompanyName,
        Location: job.Location.name || "",
        Logo: company.Logo || "",
      });
      await saveJob.save();

      return res.json({ msg: "Job Saved!", job: job });
    }
  } catch (error) {
    console.log(error.message);
  }
});

//@DELETE Saved JOb
router.delete("/unSaveJob/:id", auth, async (req, res) => {
  try {
    const job = await Jobs.findOne({ _id: req.params.id });
    if (!job) {
      return res.json({ msg: "Wrong Job ID" });
    }
    var saveJob = await SavedJobs.findOne({
      jobID: req.params.id,
      user: req.user.id,
    });
    if (!saveJob) {
      return res.json({ msg: "Saved Job Not Found!!" });
    } else {
      await SavedJobs.findOneAndRemove({ jobID: req.params.id });
      return res.json({ msg: "Job UnSaved" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:id", auth, (req, res) => {
  Jobs.findByIdAndDelete(req.params.id)
    .then(() => res.json("Job deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

//@PUT Route
//@DESC Update Job by ID
router.patch("/update/:id", async (req, res) => {
  const {
    CompanyName,
    Designation,
    ContactPerson,
    ContactNumber,
    Positions,
    ContactEmail,
    JobTitle,
    JobType,
    Qualification,
    Experience,
    ExpectedCTC,
    Industry,
    KeySkills,
    Location,
    PublishType,
    Remarks,
    Description,
    SalaryRange,
    Distance,
    PreviousExp,
    CompanyHireRate,
    CompanyMemberSince,
    Category,
    Questions,
    PostingType,
  } = req.body;
  const jobFields = {};
  try {
    if (Category) jobFields.Category = Category;
    if (Positions) jobFields.Positions = Positions;
    if (SalaryRange) jobFields.SalaryRange = SalaryRange;
    if (Distance) jobFields.Distance = Distance;
    if (PreviousExp) jobFields.PreviousExp = PreviousExp;
    if (CompanyHireRate) jobFields.CompanyHireRate = CompanyHireRate;
    if (CompanyMemberSince) jobFields.CompanyMemberSince = CompanyMemberSince;
    if (CompanyName) jobFields.CompanyName = CompanyName;
    if (Description) jobFields.Description = Description;
    if (Designation) jobFields.Designation = Designation;
    if (ContactPerson) jobFields.ContactPerson = ContactPerson;
    if (ContactNumber) jobFields.ContactNumber = ContactNumber;
    if (JobTitle) jobFields.JobTitle = JobTitle;
    if (JobType) jobFields.JobType = JobType;
    if (Qualification) jobFields.Qualification = Qualification;
    if (Experience) jobFields.Experience = Experience;
    if (ExpectedCTC) jobFields.ExpectedCTC = ExpectedCTC;
    if (Industry) jobFields.Industry = Industry;
    if (Questions) jobFields.Questions = Questions;
    if (KeySkills) {
      jobFields.KeySkills = KeySkills;
    }
    if (ContactEmail) jobFields.ContactEmail = ContactEmail;
    if (PublishType) jobFields.PublishType = PublishType;

    if (Location) jobFields.Location = Location;
    if (Remarks) jobFields.Remarks = Remarks;
    if (CompanyName) jobFields.CompanyName = CompanyName;
    if (PostingType) jobFields.PostingType = PostingType;
    jobFields.date = Date.now();
    var company = await Company.findOne({ CompanyName: CompanyName });
    if (company) {
      jobFields.Logo = company.Logo;
      console.log(req.params.id);
      let job = await Jobs.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: jobFields },
        { new: true }
      );
      if (job) {
        return res.json({ status: "success", job: job });
      }
    } else {
      return res.json({ status: "failure", msg: "Company not Created Yet!" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

//@Get Job by Company name
router.get("/jobs/:company", async (req, res) => {
  try {
    const job = await Jobs.find({ CompanyName: req.params.company });
    if (job.length == 0) {
      return res.json({ msg: "No Jobs Posted by this Company!" });
    }
    res.json(job);
  } catch (error) {
    console.log(error.message);
  }
});

// @GET Expired or Inacive Jobs
router.get("/expired", async (req, res) => {
  try {
    var jobs = await Jobs.find();
    jobs = jobs.filter((job) => {
      if (Date.now() > job.Validity) {
        return job;
      }
    });
    if (!jobs) {
      return res.json({ status: "failure", msg: "No Inactive Jobs" });
    }
    res.json({ status: "success", jobs });
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
    // var users = await Jobs.find();
    // var len = users.length;
    // if (users.length == 0) {
    //   return res.json({ msg: "No Users Found!" });
    // }
    // if (perPage * page < users.length) {
    //   var user2 = await Jobs.find()
    //     .limit(perPage + 1)
    //     .skip(perPage * page + 1);
    // }
    // user = await Jobs.find()
    //   .limit(perPage)
    //   .skip(perPage * page);
    // res.json({ users: users, length: len });

    const page = req.params.page * 1 || 1;
    const limit = req.params.perPage * 1 || 10;
    const skip = (page - 1) * limit;

    const jobs = await Jobs.find({ jobStatus: "Approved" })
      .skip(skip)
      .limit(limit);

    res.json({ status: "success", jobs });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
