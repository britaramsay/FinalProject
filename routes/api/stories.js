const router = require("express").Router();
const storiesController = require("../../controller/storiesController");

router.route("/")
  .get(storiesController.findAll)

router.route("/:id/:language")
  .get(storiesController.findBoth)

router.route("/translate/:id/:language")
  .get(storiesController.translateStory)

router.route("/set/language/:language")
  .get(storiesController.language)

router.route("/getLanguage")
  .get(storiesController.getLanguage)

router.route("/new/user/:uid")
  .get(storiesController.newUser)

router.route("/save/word/:uid/:word/:language/:english")
  .get(storiesController.saveWord)

router.route("/translate/word/:word/:language")
  .get(storiesController.translateWord)

router.route("/profile/:user/:language")
  .get(storiesController.getVocab)
module.exports = router;