const Widget = require("./models/Widget");
const Instruction = require("./models/Instruction");
const moment = require("moment");
const fs = require("fs");

var loggers = {};

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
  const { direction, color, criteria } = instruction;
  const { before, after } = transformation;

  /*
  log entry should include datetime, the instruction used, original state of widget, transformed
  state of widget, and if the transformation occurred when it was ingoing or outgoing
  */

  let logEntry = `
  ===========================================================================\n
  Transformation Time: ${moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}\n\n
  Instruction Used:\n
  -- Direction: ${direction}\n
  -- Color Change: ${color}\n
  -- Criteria: ${JSON.stringify(criteria)}\n\n
  Widget Before:\n 
  ${JSON.stringify(before, null, "\t")}\n\n
  Widget After:\n 
  ${JSON.stringify(after, null, "\t")}\n\n
  ===========================================================================\n
  `;

  // do i need to make a log?
  if (loggers[color]) {
    loggers[color].write(logEntry);
  } else {
    loggers[color] = fs.createWriteStream(`logs/${color}.log`);
    loggers[color].write(logEntry);
  }
};

module.exports = {
  checkForOutgoingTransformation,
  logTransformation
};
