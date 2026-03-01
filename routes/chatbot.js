const router = require("express").Router();
const controller = require("../controllers/chatbotController");

router.get("/", controller.getChats);
router.post("/", controller.addChat);
router.delete("/:id", controller.deleteChat);
router.post("/message", controller.getBotReply);

module.exports = router;