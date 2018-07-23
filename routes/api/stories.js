const router = require("express").Router();
const storiesController = require("../../controller/storiesController");

router.route("/:id")
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

router.route("/translate/word/:word/:language")
  .get(storiesController.translateWord)

router.route("/profile/:user/:language")
  .get(storiesController.getVocab)

router.route("/:user/:title/:author/:privat")
  .post(storiesController.uploadDoc)

router.route("/save/word/:uid/:word/:language/:english")
  .get(storiesController.saveWord)

module.exports = router;