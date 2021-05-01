const express = require("express");
const auth = require("../../middleware/auth");
const MockTest = require("../../models/MockTest");
const TestQuestion = require("../../models/TestQuestions");
const User = require("../../models/User");
const router = express.Router();

//@GET Route
//@DESC Get All The Tests
router.get("/", async (req, res) => {
  try {
    var mockTests = await MockTest.find();
    if (mockTests.length == 0) {
      return res.json({ msg: "No Mock Test Created!" });
    }
    var activeMock = mockTests.filter((test) => {
      if (Date.now() < test.Validity) {
        return test;
      }
    });
    if (activeMock.length == 0) {
      return res.json({ msg: "No Mock Test Found!" });
    }
    res.json(activeMock);
  } catch (error) {
    console.log(error.message);
  }
});

//@GET Route
//@DESC Get All the Tests by Date
router.get("/mockTests/:Date", async (req, res) => {
  try {
    var mockTest = await MockTest.find();
    if (mockTest.length == 0) {
      return res.json({ msg: "No Mock Tests Created Yet!" });
    }
    var tests = [];
    tests = mockTest.filter((test) => {
      if (new Date(req.params.Date) <= new Date(test.LastUpdate)) {
        return test;
      }
    });
    res.json(tests);
  } catch (error) {
    console.log(error.message);
  }
});

//@POST Route
//@DESC Create Mock Test
router.post("/createMockTest", async (req, res) => {
  const {
    TestCode,
    TestTitle,
    TestDescription,
    Category,
    Duration,
    Validity,
    Guidelines,
  } = req.body;
  var mockTestFields = {};
  try {
    if (TestCode) mockTestFields.TestCode = TestCode;
    if (Guidelines) mockTestFields.Guidelines = Guidelines;
    if (TestTitle) mockTestFields.TestTitle = TestTitle;
    if (TestDescription) mockTestFields.TestDescription = TestDescription;
    if (Category) mockTestFields.Category = Category;
    if (Duration) mockTestFields.Duration = Duration;
    if (Validity) mockTestFields.Validity = Validity;
    var mock = await MockTest.findOne({ TestCode: req.body.TestCode });
    if (mock) {
      mock = await MockTest.findOneAndUpdate(
        { TestCode: req.body.TestCode },
        { $set: mockTestFields },
        { new: true }
      );
      return res.json({ msg: "Mock test Updated!", mockTest: mock });
    }
    mock = new MockTest(mockTestFields);
    await mock.save();
    res.json({ msg: "Mock Test Created!", mockTest: mock });
  } catch (error) {
    console.log(error.message);
  }
});

//@POST Route
//@DESC Create Test's Question
router.post("/createQuestion", async (req, res) => {
  const {
    TestCode,
    Question,
    Option1,
    Option2,
    Option3,
    Option4,
    CorrectOption,
    Marks,
  } = req.body;
  var testFields = {};
  var mockTestFields = {
    TestData: [],
  };
  try {
    if (TestCode) testFields.TestCode = TestCode;
    if (Question) testFields.Question = Question;
    if (Option1) testFields.Option1 = Option1;
    if (Option2) testFields.Option2 = Option2;
    if (Option3) testFields.Option3 = Option3;
    if (Option4) testFields.Option4 = Option4;
    if (CorrectOption) testFields.CorrectOption = CorrectOption;
    if (Marks) testFields.Marks = Marks;
    var questions = new TestQuestion(testFields);
    await questions.save();
    var mockTest = await MockTest.findOne({ TestCode: req.body.TestCode });
    if (mockTest) {
      mockTestFields.TestData = mockTest.TestData;
      mockTestFields.TestData.push(questions);
      mockTest = await MockTest.findOneAndUpdate(
        {
          TestCode: req.body.TestCode,
        },
        {
          $set: mockTestFields,
        },
        {
          new: true,
        }
      );
      return res.json({ msg: "Question Added in the Mock Test" });
    }
    res.json({ msg: "Create A Test First!" });
  } catch (error) {
    console.log(error.message);
  }
});

//@PUT Route
//@DESC Update Specific Question by Question ID
router.put("/update/:id", auth, async (req, res) => {
  const {
    TestCode,
    Question,
    Option1,
    Option2,
    Option3,
    Option4,
    CorrectOption,
    Marks,
  } = req.body;
  var testFields = {};
  var mockTestFields = {
    LastUpdate: Date.now,
  };
  try {
    if (TestCode) testFields.TestCode = TestCode;
    if (Question) testFields.Question = Question;
    if (Option1) testFields.Option1 = Option1;
    if (Option2) testFields.Option2 = Option2;
    if (Option3) testFields.Option3 = Option3;
    if (Option4) testFields.Option4 = Option4;
    if (CorrectOption) testFields.CorrectOption = CorrectOption;
    if (Marks) testFields.Marks = Marks;
    var ques = await TestQuestion.findById(req.params.id);
    if (!ques) {
      return res.json({ msg: "No Question Found!" });
    }
    await MockTest.findOneAndUpdate(
      { TestCode: req.body.TestCode },
      { $set: mockTestFields },
      { new: true }
    );
    ques = await TestQuestion.findOneAndUpdate(
      { _id: req.params.id },
      { $set: testFields },
      { new: true }
    );
    res.json({ msg: "Test Question Updated!", question: ques });
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "Please Enter a Valid ID." });
    }
  }
});

//@POST Route
//@DESC Select Option on Specific Test Question
router.post("/select/testQuestion/:id", auth, async (req, res) => {
  const { answer } = req.body;
  var userFields = {
    Test: {
      Data: [],
    },
  };
  var resultObj = {
    Data: {},
    Marks: 0,
  };
  var testFields = {
    Users: [],
  };
  try {
    var test = await TestQuestion.findById(req.params.id);
    var user = await User.findById(req.user.id);
    resultObj.Data = test;
    if (answer == test.CorrectOption) {
      testFields.Users.push(user);

      resultObj.Marks = test.Marks;
    }
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "Please Enter a Valid ID" });
    }
  }
});

//@DELETE Test by Id
router.delete("/delete/:id", async (req, res) => {
  try {
    await MockTest.findByIdAndDelete(req.params.id);
    res.json({ msg: "Test Deleted!" });
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "Please Enter a Valid ID" });
    }
  }
});

//@ROUTER GET InActive Mock Test
router.get("/inActive", async (req, res) => {
  try {
    var tests = await MockTest.find();
    if (tests.length == 0) {
      return res.json({ msg: "No Test Found!" });
    }
    var inActiveTest = tests.filter((test) => {
      if (Date.now() > test.Validity) {
        return test;
      }
    });
    if (inActiveTest.length == 0) {
      return res.json({ msg: "No Test Found!" });
    }
    res.json(inActiveTest);
  } catch (error) {
    console.log(error.message);
  }
});

//@TEST ROUTE
//@GET User as per Pagination
router.get("/users/:page/:perPage", async (req, res) => {
  try {
    var page = parseInt(req.params.page);
    var perPage = parseInt(req.params.perPage);
    var users = await MockTest.find();
    var len = users.length;
    if (users.length == 0) {
      return res.json({ msg: "No Users Found!" });
    }
    if (perPage * page < users.length) {
      var user2 = await MockTest.find()
        .limit(perPage + 1)
        .skip(perPage * page + 1);
    }
    user = await MockTest.find()
      .limit(perPage)
      .skip(perPage * page);
    res.json({ users: users, length: len });
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;
