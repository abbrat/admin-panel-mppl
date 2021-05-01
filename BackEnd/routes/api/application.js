const express = require("express");
const auth = require("../../middleware/auth");
const Applications = require("../../models/Applications");
const User = require("../../models/User");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

router.get("/", auth, async (req, res) => {
  try {
    const applications = await Applications.find({ userID: req.user.id });
    if (applications.length == 0) {
      return res
        .status(404)
        .json({ msg: "User has not Applied for Any Jobs Yet!" });
    }
    return res.json(applications);
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    var application = await Applications.findById(req.params.id);
    if (!application) {
      return res.json({ msg: "Application not Found!" });
    }
    const user = await User.findOne({ _id: application.userID });

    if (application) {
      application = await Applications.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $set: {
            status: req.body.status,
          },
        },
        {
          new: true,
        }
      );
      const msg = {
        to: user.email,
        from: "vedant.pruthi.io@gmail.com",
        subject: "Job Status Changed",
        text: "First Message via Send Grid",
        html:
          "<b>Hey there</b>" +
          user.name +
          " Your Job Status has been Changed to " +
          req.body.status +
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
      return res.json({ msg: "Job Status Changed", data: application });
    }
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ msg: "Enter a Valid ID" });
    }
  }
});

module.exports = router;
