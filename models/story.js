const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TranslatedStories = require('./translated')

const StorySchema = new Schema({
  title: { type: String },
  author: { type: String },
  paragraphs: [{ type: String }],
  available: [
    { 
      type: Schema.Types.ObjectId, 
      ref: "Translatedstorie" 
    }
  ]
});

const Story = mongoose.model("Storyeng", StorySchema);

module.exports = Story;
