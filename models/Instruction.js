var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const instructionSchema = new Schema({
  direction: {
    type: String,
    enum: ["incoming", "outgoing"]
  },
  criteria: [String],
  color: String,
  date: { type: Date, default: Date.now }
});

const Instruction = mongoose.model("Instruction", instructionSchema);

module.exports = Instruction;