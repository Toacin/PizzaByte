const router = require("express").Router();
const controller = require("../APIcontrollers/ordersController");
const optionalAuthenticateToken = require("../middlewares/optionalAuthenticateUserToken");
const authenticateToken = require("../middlewares/authenticateUserToken");

// ==================================================
// current path: /api/orders
// ==================================================

router.post("/createOrder", optionalAuthenticateToken, controller.createOrder);
router.get("/getOrdersByUser", authenticateToken, controller.getOrdersByUser);

module.exports = router;
