var express = require("express");
var router = express.Router();
const Instruction = require("../models/Instruction");

router.get("/", async function(req, res) {
  let allInstructions = await Instruction.find({});
  return res.status(200).json({ data: allInstructions });
});

router.post("/", async function({ body }, res) {
  // check that the instruction is unique via direction + criteria

  let foundInstruction = await Instruction.exists({
    direction: body.direction,
    criteria: { $size: body.criteria.length, $all: body.criteria }
  });

  if (foundInstruction) {
    return res.status(403).json({ error: "Instruction Already exists" });
  }

  //create a instruction in database
  let newInstruction = new Instruction(body);
  newInstruction.save(err => {
    if (err) {
      return res.status(403).json({ error: err });
    }
    return res.status(201).json({ data: newInstruction });
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
