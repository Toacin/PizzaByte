const router = require("express").Router();
const controller = require("../APIcontrollers/authController");

// ==================================================
// current path: /api/auth
// ==================================================

router.post("/signup", controller.signup);
router.post("/login", controller.login);

module.exports = router;
