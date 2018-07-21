const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VocabSchema = new Schema({
  language: { type: String,
              required: true
  },
  word: {
      type: String,
      required: true
  },
  english: {
    type: String
  }
});

const Vocab = mongoose.model("Vocab", VocabSchema);

module.exports = Vocab;