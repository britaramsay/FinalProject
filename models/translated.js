const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TranslatedSchema = new Schema({
  language: { type: String },
  title: { type: String },
  author: { type: String },
  paragraphs: [{
                type: String
            }]
});

const Translatedstorie = mongoose.model("Translatedstorie", TranslatedSchema);

module.exports = Translatedstorie;