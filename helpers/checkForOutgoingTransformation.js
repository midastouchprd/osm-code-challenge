const Widget = require("../models/Widget");
const Instruction = require("../models/Instruction");

module.exports = {
  checkForOutgoingTransformation: async widget => {
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
      transformation.after = widget;
    }

    return Promise.resolve(transformation);
  }
};
