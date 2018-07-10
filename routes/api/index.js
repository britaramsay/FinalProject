const router = require("express").Router();
const storiesRoutes = require("./stories");

// Book routes
router.use("/stories", storiesRoutes);

module.exports = router;
