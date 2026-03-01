const router = require("express").Router();
const controller = require("../controllers/translateController");

router.post("/", controller.translateWord);

module.exports = router;