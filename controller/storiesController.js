const db = require("../models/index");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Story
      .find({})
      .populate('available')
      .then(model => {
        // console.log(model)
        res.json(model)
      })
      .catch(err => res.status(422).json(err));

  },
  findOne: function (req, res) {  
    db.Story
      .find({_id: req.params.id})
      .populate('available')
      .then(dbModel => {
        console.log(dbModel)
        res.json(dbModel)})
      .catch(err => res.status(422).json(err));
  }
}