var express = require("express");
var router = express.Router();
const Instruction = require("../models/Instruction");

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

  instructions.map(instruction => {
    instruction.name = `${
      instruction.direction
    } (${instruction.criteria.join()})`;
    return instruction;
  });

  Instruction.collection.insertMany(instructions, (err, docs) => {
    if (err) {
      return res.status(403).json({ err });
    }
    return res.status(201).json({ data: docs.ops });
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

module.exports = router;
