const router = require("express").Router();
const controller = require("../APIcontrollers/classicsController");
const authenticateToken = require("../middlewares/authenticateUserToken");

// ==================================================
// current path: /api/classics
// ==================================================

router.get("/", controller.getAllClassics);
router.post("/", authenticateToken, controller.addClassic);
router.delete("/:classicId", authenticateToken, controller.deleteClassic);

module.exports = router;
