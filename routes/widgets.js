const express = require("express");
const router = express.Router();
const Widget = require("../models/Widget");
const Instruction = require("../models/Instruction");
const helpers = require("../helpers");
const { checkForOutgoingTransformation } = helpers;

router.get("/", async function(req, res) {
  let allWidgets = await Widget.find({});
  var transformedWidgets = [];

  for (let i = 0; i < allWidgets.length; i++) {
    const widget = allWidgets[i];
    let transformation = await checkForOutgoingTransformation(widget);
    if (transformation.after) {
      transformedWidgets.push(transformation);
    }
  }

  return res
    .status(200)
    .json({ data: allWidgets, transformations: transformedWidgets });
});

//create a widget
router.post("/", async function(req, res) {
  // check that the widget is unique via shape + qualities
  if (!Array.isArray(req.body)) {
    widgets = [req.body];
  } else {
    widgets = req.body;
  }

  widgets.map(widget => {
    widget.name = `${widget.shape} (${widget.qualities.join()})`;
    widget.createdAt = Date.now();
    widget.updatedAt = Date.now();
    return widget;
  });

  Widget.collection.insertMany(widgets, (err, docs) => {
    if (err) {
      return res.status(403).json({ err });
    }
    return res.status(201).json({ data: docs.ops });
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
