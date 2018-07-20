const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RussianSchema = new Schema({
  title: { type: String },
  author: { type: String },
  paragraphs: [{
                type: String
            }]
});

const Russian = mongoose.model("Russian", RussianSchema);

module.exports = Russian;