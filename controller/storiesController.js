const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Story
      .find({})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findOne: function (req, res) {  
    db.Story
      .find({_id: req.params.id})
      .then(dbModel => {
        res.json(dbModel)})
      .catch(err => res.status(422).json(err));
  }
}