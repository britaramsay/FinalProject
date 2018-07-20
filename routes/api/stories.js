const router = require("express").Router();
const storiesController = require("../../controller/storiesController");

router.route("/")
  .get(storiesController.findAll)

router.route("/:id/:language")
  .get(storiesController.findBoth)

router.route("/definition/:language/:word")
  .get(storiesController.getWordInfo)

router.route("/translate/:id/:language")
  .get(storiesController.translateStory)
  
module.exports = router;