const router = require("express").Router();
const controller = require("../APIcontrollers/toppingsController");
const authenticateToken = require("../middlewares/authenticateUserToken");

// ==================================================
// current path: /api/toppings
// ==================================================

router.get("/", controller.getToppings);
router.post("/", authenticateToken, controller.addToppings);
router.delete("/:toppingName", authenticateToken, controller.deleteTopping);

module.exports = router;
