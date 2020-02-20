const express = require("express");
const router = express.Router();
const Widget = require("../models/Widget");

router.get("/", async function(req, res) {
  let allWidgets = await Widget.find({});
  return res.status(200).json({ data: allWidgets });
});

//create a widget
router.post("/", async function(req, res) {
  // check that the widget is unique via shape + qualities

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
    return res.status(201).json({ data: newWidget });
  });
});
//update a widget
router.put("/:id", async function(req, res) {
  var query = { _id: req.params.id };

  Widget.findOneAndUpdate(
    query,
    req.body,
    { upsert: true, useFindAndModify: false, new: true },
    function(err, doc) {
      if (err) {
        return res.status(403).json({ error: err });
      }
      return res.status(201).json({ data: doc });
    }
  );
});

module.exports = router;
