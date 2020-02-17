var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const widgetSchema = new Schema({
  color: String,
  shape: {
    type: String,
    enum: ["circle", "square", "triangle"]
  },
  qualities: [String],
  date: { type: Date, default: Date.now }
});

const Widget = mongoose.model("Widget", widgetSchema);

module.exports = Widget;
