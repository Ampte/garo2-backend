const router = require("express").Router();
const controller = require("../controllers/usersController");

router.get("/", controller.getUsers);
router.post("/", controller.addUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;