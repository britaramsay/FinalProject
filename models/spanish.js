const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SpanishSchema = new Schema({
  title: { type: String },
  author: { type: String },
  paragraphs: [{
                type: String
            }]
});

const Spanish = mongoose.model("Spanish", SpanishSchema);

module.exports = Spanish;