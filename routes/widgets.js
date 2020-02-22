const express = require("express");
const router = express.Router();
const Widget = require("../models/Widget");
const Instruction = require("../models/Instruction");

router.get("/", async function(req, res) {
  let allWidgets = await Widget.find({});
  var transformedWidgets = [];

  //look for widget transformations
  for (let i = 0; i < allWidgets.length; i++) {
    let transforms = {};
    let newCriteria = [];
    const oldWidget = Object.assign({}, allWidgets[i]._doc);
    transforms.before = oldWidget;
    let newWidget = allWidgets[i];
    newCriteria.push(newWidget.shape);
    let qualities = newWidget.qualities;
    for (let j = 0; j < qualities.length; j++) {
      newCriteria.push(qualities[j]);
    }

    console.log("====================================");
    console.log(newCriteria);
    console.log("====================================");

    let transformingInstruction = await Instruction.findOne({
      criteria: { $size: newCriteria.length, $all: newCriteria },
      direction: "outgoing"
    });

    console.log("====================================");
    console.log(transformingInstruction);
    console.log("====================================");

    if (transformingInstruction) {
      let newWidget = allWidgets[i];
      newWidget.color = transformingInstruction.color;
      transforms.after = newWidget;
      transformedWidgets.push(transforms);
    }
    return res
      .status(200)
      .json({ data: allWidgets, transformations: transformedWidgets });
  }
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
