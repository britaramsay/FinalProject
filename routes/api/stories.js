const router = require("express").Router();
const storiesController = require("../../controller/storiesController");

router.route("/")
  .get(storiesController.findAll)

router
  .route("/:id")
  .get(storiesController.findOne)

router.route("/:id/:language")
  .get(storiesController.findBoth)
module.exports = router;