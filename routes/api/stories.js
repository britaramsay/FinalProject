const router = require("express").Router();
const storiesController = require("../../controller/storiesController");

// Matches with "/api/books"
router.route("/")
  .get(storiesController.findAll)

// // Matches with "/api/books/:id"
router
  .route("/:id")
  .get(storiesController.findOne)

module.exports = router;