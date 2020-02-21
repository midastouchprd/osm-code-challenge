var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const instructionSchema = new Schema({
  direction: {
    type: String,
    enum: ["incoming", "outgoing"]
  },
  criteria: [String],
  color: String,
  name: { type: String, unique: true },
  date: { type: Date, default: Date.now }
});

const Instruction = mongoose.model("Instruction", instructionSchema);

module.exports = Instruction;
