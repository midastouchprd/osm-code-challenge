const Widget = require("../models/Widget");
const Instruction = require("../models/Instruction");
const moment = require("moment");

const checkForOutgoingTransformation = async widget => {
  let transformation = { before: {}, after: false };
  transformation.before = Object.assign({}, widget._doc);
  const { shape, qualities } = widget;
  qualities.unshift(shape);

  let transformInstruction = await Instruction.findOne({
    direction: "outgoing",
    criteria: { $size: qualities.length, $all: qualities }
  });

  if (transformInstruction) {
    widget.color = transformInstruction.color;
    widget.updatedAt = Date.now;
    transformation.after = widget;
    logTransformation(transformation, transformInstruction);
  }
  return Promise.resolve(transformation);
};

const logTransformation = async (transformation, instruction) => {
  console.log("============transformation========================");
  console.log(transformation);
  console.log("============instruction========================");
  console.log(instruction);
  console.log("====================================");

  /*
  log entry should include datetime, the instruction used, original state of widget, transformed
  state of widget, and if the transformation occurred when it was ingoing or outgoing
  */

  let logEntry = `Transformation Time: ${moment().format(
    "dddd, MMMM Do YYYY, h:mm:ss a"
  )}`;

  console.log("=======log entry===========");
  console.log(logEntry);
  console.log("====================================");
};

module.exports = {
  checkForOutgoingTransformation,
  logTransformation
};
