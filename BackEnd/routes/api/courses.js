const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Courses = require("../../models/Courses");

router.post("/", auth, async (req, res) => {
  const { CourseTitle, Remarks, Type, Fees, Opted } = req.body;

  const courses = new Courses({
    CourseTitle,
    Remarks,
    Type,
    Fees,
    Opted,
  });

  await courses
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/allCourses", auth, (req, res) => {
  Courses.find()
    .sort({ CourseTitle: 1 })
    .then((jobs) => res.json(jobs))
    .catch((err) => res.json(err));
});

router.get("/CourseType", auth, (req, res) => {
  const type = req.body.Type;
  Courses.find({ Type: type })
    .sort({ CourseTitle: 1 })
    .then((jobs) => res.json(jobs))
    .catch((err) => res.json(err));
});

// router.get('/jobBySearchQuery', auth, (req, res) => {

// })

router.get("/specificCourse/:id", auth, (req, res) => {
  Courses.findById(req.params.id)
    .then((job) => res.json(job))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/deleteCourse/:id", auth).delete((req, res) => {
  Courses.findByIdAndDelete(req.params.id)
    .then(() => res.json("Job deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
