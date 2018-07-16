const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  _id: Schema.Types.ObjectId,
  test: { type: String },
});

const Test = mongoose.model("Test", TestSchema);

module.exports = Test;
