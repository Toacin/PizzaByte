const router = require("express").Router();
const controller = require("../APIcontrollers/index");

// ==================================================
// current path: /api
// ==================================================

router.get("/testRoute", controller.testController);

module.exports = router;
