const router = require("express").Router();
const controller = require("../controllers/dictionaryController");

router.get("/", controller.getWords);
router.post("/", controller.addWord);
router.delete("/:id", controller.deleteWord);

module.exports = router;