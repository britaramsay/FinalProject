const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GermanSchema = new Schema({
  title: { type: String },
  author: { type: String },
  paragraphs: [{
                type: String
            }]
});

const German = mongoose.model("German", GermanSchema);

module.exports = German;