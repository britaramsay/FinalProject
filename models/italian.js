const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItalianSchema = new Schema({
  title: { type: String },
  author: { type: String },
  paragraphs: [{
                type: String
            }]
});

const Italian = mongoose.model("Italian", ItalianSchema);

module.exports = Italian;