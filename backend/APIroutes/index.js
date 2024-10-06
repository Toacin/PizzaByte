const router = require("express").Router();
const controller = require("../APIcontrollers/index");
const authRoutes = require("./authRoutes");
const ordersRoutes = require("./ordersRoutes");
const classicsRoutes = require("./classicsRoutes");
const toppingsRoutes = require("./toppingsRoutes");

// ==================================================
// current path: /api
// ==================================================

router.use("/auth", authRoutes);
router.get("/testRoute", controller.testController);
router.use("/orders", ordersRoutes);
router.use("/classics", classicsRoutes);
router.use("/toppings", toppingsRoutes);

module.exports = router;
