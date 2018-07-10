const router = require("express").Router();
const storiesController = require("../../controller/storiesController");

// Matches with "/api/books"
router.route("/")
  .get(storiesController.findAll)
//   .post(booksController.create);

// // Matches with "/api/books/:id"
router
  .route("/:id")
  .get(storiesController.findOne)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;