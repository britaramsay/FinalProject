const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  uid: { 
    type: String,
    unique: true,
    required: true
  },
  vocab: [{
            type: Schema.Types.ObjectId,
            ref: 'Vocab'
        }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;