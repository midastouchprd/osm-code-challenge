var express = require("express");
var router = express.Router();
const Instruction = require("../models/Instruction");
const Widget = require("../models/Widget");
const helpers = require("../helpers");
const { logTransformation } = helpers;

router.get("/", async function(req, res) {
  let allInstructions = await Instruction.find({});
  return res.status(200).json({ data: allInstructions });
});

router.post("/", async function(req, res) {
  // check that the widget is unique via shape + qualities
  if (!Array.isArray(req.body)) {
    instructions = [req.body];
  } else {
    instructions = req.body;
  }

  // create unique readable key for instructions
  instructions.map(async instruction => {
    instruction.createdAt = Date.now();
    instruction.updatedAt = Date.now();
    instruction.name = `${
      instruction.direction
    } (${instruction.criteria.join()})`;

    return instruction;
  });

  // insert all the instructions
  let savedInstructions = null;
  Instruction.collection.insertMany(instructions, async (err, docs) => {
    if (err) {
      // if there is a bulkWriteError overwrite the instructions
      let newInstruction = err.op;
      delete newInstruction._id;
      Instruction.findOneAndUpdate(
        { name: newInstruction.name },
        newInstruction,
        { upsert: true, useFindAndModify: false, new: true },
        function(err, doc) {
          if (err) {
            return res.status(403).json({ err });
          }
        }
      );
    }
    var updates = [];
    var transformWidget = {};
    for (let i = 0; i < instructions.length; i++) {
      let shape;
      let qualities = [];
      const instruction = instructions[i];

      if (instruction.direction === "incoming") {
        for (let j = 0; j < instruction.criteria.length; j++) {
          let crit = instruction.criteria[j];

          if (crit === "circle" || crit === "triangle" || crit === "square") {
            shape = crit;
          } else {
            qualities.push(crit);
          }
        }
        const widget = await Widget.findOne({ shape, qualities });

        if (widget) {
          transformWidget.before = widget;
          const afterWidget = await Widget.findOneAndUpdate(
            { shape, qualities },
            { color: instruction.color },
            { upsert: true, useFindAndModify: false, new: true }
          ).catch(err => {
            return res.status(403).json({ err });
          });
          if (afterWidget) {
            transformWidget.after = afterWidget;
            logTransformation(transformWidget, instruction);
          }
        }
        updates.push(transformWidget);
      }
    }
    return setTimeout(() => {
      return res
        .status(201)
        .json({ data: instructions, transformations: updates });
    }, 5000);
  });
});

//update a instruction
router.put("/:id", async function(req, res) {
  var query = { _id: req.params.id };

  Instruction.findOneAndUpdate(
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

//delete a instruction
router.delete("/:id", async function(req, res) {
  var query = { _id: req.params.id };

  Instruction.findOneAndDelete(query, function(err, doc) {
    if (err) {
      return res.status(403).json({ error: err });
    }
    return res.status(201).json({ data: `deleted ${doc.name}` });
  });
});

module.exports = router;
