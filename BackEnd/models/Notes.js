const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  fileName: {
    type: String,
  },
  fileAuthor: {
    type: String,
  },
  file: {
    type: String,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Notes = mongoose.model("Notes", NotesSchema);
