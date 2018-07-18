const router = require("express").Router();
const storiesController = require("../../controller/storiesController");

// Matches with "/api/books"
router.route("/")
  .get(storiesController.findAll)

router
  .route("/:id")
  .get(storiesController.findOne)

// router.route("/:language/:id")
//   .get(storiesController.findBoth)
module.exports = router;