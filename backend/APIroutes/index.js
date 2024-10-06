const router = require("express").Router();
const controller = require("../APIcontrollers/index");
const authRoutes = require("./authRoutes");

// ==================================================
// current path: /api
// ==================================================

router.use("/auth", authRoutes);
router.get("/testRoute", controller.testController);

module.exports = router;
