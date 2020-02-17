var express = require("express");
var router = express.Router();
const Instruction = require("../models/Instruction");

router.get("/", function(req, res) {
  res.json({ data: "This is the instructions resource" });
});

router.post("/", async function(req, res) {
  // check that the instruction is unique via direction + criteria

  let foundInstruction = await Instruction.exists({
    direction: req.body.direction,
    criteria: { $size: req.body.criteria.length, $all: req.body.criteria }
  });

  if (foundInstruction) {
    return res.status(403).json({ error: "Instruction Already exists" });
  }

  //create a instruction in database
  let newInstruction = new Instruction(req.body);
  newInstruction.save(err => {
    if (err) {
      return res.status(403).json({ error: err });
    }
    return res.status(201).json({ data: req.body });
  });
});

module.exports = router;
