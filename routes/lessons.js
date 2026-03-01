const router = require("express").Router();
const controller = require("../controllers/lessonsController");

router.get("/", controller.getLessons);
router.post("/", controller.addLesson);
router.delete("/:id", controller.deleteLesson);

module.exports = router;