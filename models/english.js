const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TranslatedStories = require('./translated')

const EnglishSchema = new Schema({
    title: { type: String },
    author: { type: String },
    paragraphs: [{ type: String }],
    french: { 
        type: Schema.Types.ObjectId, 
        ref: "French" 
    },
    german: { 
        type: Schema.Types.ObjectId, 
        ref: "German" 
    },
    italian: { 
        type: Schema.Types.ObjectId, 
        ref: "Italian" 
    },
    japanese: { 
        type: Schema.Types.ObjectId, 
        ref: "Japanese" 
    },
    russian: { 
        type: Schema.Types.ObjectId, 
        ref: "Russian" 
    },
    spanish: { 
        type: Schema.Types.ObjectId, 
        ref: "Spanish" 
    },
});

const English = mongoose.model("English", EnglishSchema);

module.exports = English;
