var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var Schema = mongoose.Schema;

const widgetSchema = new Schema({
  color: String,
  shape: {
    type: String
  },
  qualities: [String],
  name: { type: String, unique: true },
  date: { type: Date, default: Date.now }
});

widgetSchema.plugin(uniqueValidator);

const Widget = mongoose.model("Widget", widgetSchema);

module.exports = Widget;
