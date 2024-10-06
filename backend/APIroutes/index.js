const router = require("express").Router();
const controller = require("../APIcontrollers/index");
const authRoutes = require("./authRoutes");
const ordersRoutes = require("./ordersRoutes");

// ==================================================
// current path: /api
// ==================================================

router.use("/auth", authRoutes);
router.get("/testRoute", controller.testController);
router.use("/orders", ordersRoutes);

module.exports = router;
