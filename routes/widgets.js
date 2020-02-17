const express = require("express");
const router = express.Router();
const Widget = require("../models/Widget");

router.get("/", function(req, res) {
  res.json({ data: "This is the widgets resource" });
});

//create a widget
router.post("/", async function(req, res) {
  /* check that the widget is unique via shape + qualities
   * if shape plus qualities is the same do not add otherwise add
   */

  // query the database for widgets with the same shape and same qualities

  // TODO: make a transform function for this.
  // TODO: if its not an array
  let foundWidget = await Widget.find({
    ...req.body,
    qualities: { $size: req.body.qualities.length, $all: req.body.qualities }
  });

  console.log("=====found=====");
  console.log(foundWidget);
  console.log("====================================");

  //create a widget in database
  let newWidget = new Widget(req.body);
  newWidget.save(err => {
    if (err) {
      console.log("=====Widget create error=============");
      console.log(err);
      console.log("====================================");
      return res.status(403).json({ error: err });
    }
    console.log("==========req.body===============");
    console.log(req.body);
    console.log("====================================");
    return res.status(201).json({ data: req.body });
  });
});

module.exports = router;
