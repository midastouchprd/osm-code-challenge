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

  // TODO: make a transform function for this.
  // TODO: if its not an array
  // query the database for widgets with the same shape and same qualities
  let foundWidget = await Widget.exists({
    shape: req.body.shape,
    qualities: { $size: req.body.qualities.length, $all: req.body.qualities }
  });

  if (foundWidget) {
    return res.status(403).json({ error: "Widget Already exists" });
  }

  //create a widget in database
  let newWidget = new Widget(req.body);
  newWidget.save(err => {
    if (err) {
      return res.status(403).json({ error: err });
    }
    return res.status(201).json({ data: req.body });
  });
});

module.exports = router;
