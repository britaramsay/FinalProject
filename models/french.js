const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FrenchSchema = new Schema({
  title: { type: String },
  author: { type: String },
  paragraphs: [{
                type: String
            }]
});

const French = mongoose.model("French", FrenchSchema);

module.exports = French;