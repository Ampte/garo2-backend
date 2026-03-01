const express = require("express");
const router = express.Router();

const controller = require("../controllers/chatbotController");

router.get("/", controller.getChats);
router.post("/", controller.addChat);
router.delete("/:id", controller.deleteChat);

module.exports = router;