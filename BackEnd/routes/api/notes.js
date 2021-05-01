const multer = require("multer");
const path = require("path");
const auth = require("../../middleware/auth");
const Notes = require("../../models/Notes");
const router = require("express").Router();
const moment = require("moment");
const storage = multer.diskStorage({
  destination: "./Notes",
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

//@TEST ROUTE
//@GET User as per Pagination
router.get("/users/:page/:perPage", async (req, res) => {
  try {
    var page = parseInt(req.params.page);
    var perPage = parseInt(req.params.perPage);
    var users = await Notes.find();
    var len = users.length;
    if (users.length == 0) {
      return res.json({ msg: "No Users Found!" });
    }
    if (perPage * page < users.length) {
      var user2 = await Notes.find()
        .limit(perPage + 1)
        .skip(perPage * page + 1);
    }
    user = await Notes.find()
      .limit(perPage)
      .skip(perPage * page);
    res.json({ users: users, length: len });
  } catch (error) {
    console.log(error.message);
  }
});

//@GET Route
//@DESC GET notes by ID
router.get("/details/:id", auth, async (req, res) => {
  try {
    const notes = await Notes.findById(req.params.id);
    if (!notes) {
      return res.json({ msg: "No Notes Found!" });
    }
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "Please Enter a Valid ID" });
    }
  }
});

//@GET Route
//@DESC Get All the Notes
router.get("/all", async (req, res) => {
  try {
    const notes = await Notes.find();
    if (notes.length == 0) {
      return res.status(200).json({ msg: "No Notes Added Yet!" });
    }
    res.json(notes);
  } catch (error) {
    console.log(error.message);
  }
});

//@GET Route
//@DESC Get Notes by Date
router.post("/allNotes", async (req, res) => {
  try {
    var note = await Notes.find();
    if (note.length == 0) {
      return res.json({ msg: "No Notes Created Yet!" });
    }
    if (req.body.date == "") {
      return res.json(note);
    }
    var notes = [];
    notes = note.filter((note) => {
      if (
        req.body.date <= moment(note.dateAdded).format("YYYY-MM-DD, HH:mm:ss")
      ) {
        return note;
      }
    });

    if (notes.length == 0) {
      return res.json({ msg: "No Updated Notes!" });
    }
    res.json(notes);
  } catch (error) {
    console.log(error.message);
  }
});

//@POST Route
//@DESC Create Notes
router.post("/create", [upload.single("file")], async (req, res) => {
  const { fileName, fileAuthor } = req.body;
  const notesFields = {};

  try {
    if (fileName) notesFields.fileName = fileName;
    if (fileAuthor) notesFields.fileAuthor = fileAuthor;
    if (req.file) {
      notesFields.file = `http://${req.headers.host}/Notes/${req.file.filename}`;
    }
    let notes = new Notes(notesFields);
    await notes.save();
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//@PUT Route
//@DESC Update Specific Notes by ID
router.put("/update/:id", upload.single("file"), async (req, res) => {
  const { fileName, fileAuthor } = req.body;
  const notesFields = {};
  try {
    if (fileName) notesFields.fileName = fileName;
    if (fileAuthor) notesFields.fileAuthor = fileAuthor;
    notesFields.dateAdded = Date.now();
    if (req.file) {
      notesFields.file = `http://${req.headers.host}/Notes/${req.file.filename}`;
    }
    var notes = await Notes.findById(req.params.id);
    if (!notes) {
      return res.json({ msg: "No Notes Found . Please Enter a Valid ID" });
    } else {
      notes = await Notes.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $set: notesFields,
        },
        {
          new: true,
        }
      );
      return res.json({ msg: "Notes Updated", data: notes });
    }
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.status(200).json({ msg: "Please Enter a Valid Notes ID" });
    }
  }
});

//@DELETE Route
//@DESC Delete Specific Notes by ID
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    await Notes.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: "Notes Removed" });
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "Please Enter a Valid ID" });
    }
  }
});
module.exports = router;
