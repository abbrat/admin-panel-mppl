const Category = require("../../models/Category");

const router = require("express").Router();

//@GET Route
//@DESC Get all the Categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length == 0) {
      return res.json({ msg: "No Categories Found!" });
    }
    res.json(categories);
  } catch (error) {
    console.log(error.message);
  }
});

//@POST Route
//@DESC Create Category
router.post("/", async (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  var catFields = {};
  try {
    if (name) catFields.name = name;
    var category = await Category.findOne({ name });
    if (category) {
      return res.json({ msg: "Category already Present!" });
    }
    category = new Category(catFields);
    await category.save();
    res.json({ msg: "Category Created!", category: category });
  } catch (error) {
    console.log(error.message);
  }
});

//@PUT Route
//@DESC Update Category By Id
router.put("/update/:id", async (req, res) => {
  var catFields = {
    name: req.body.name,
  };
  try {
    var category = await Category.findById(req.params.id);
    if (!category) {
      return res.json({ msg: "Please Enter a Valid ID" });
    }
    category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { $set: catFields },
      { new: true }
    );
    res.json({ msg: "Category Updated!", category: category });
  } catch (error) {
    console.log(error.message);
  }
});

//@DELETE Route
//@DESC Delete Category by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    await Category.findByIdAndRemove(req.params.id);
    res.json({ msg: "Category Removed" });
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "PLease enter a Valid ID" });
    }
  }
});
module.exports = router;
