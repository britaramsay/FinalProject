const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParagraphSchema = new Schema({
  title: { type: String },
  author: { type: String },
  paragraphs: [{
                type: Schema.ObjectId, ref: 'Paragraph'
            }]
});

const Story = mongoose.model("Storyr", StorySchema);

module.exports = Story;
