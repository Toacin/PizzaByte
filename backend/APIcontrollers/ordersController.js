const { PizzaByteOrder } = require("../models");

const calculatePrice = (orderStringified) => {
  const order = JSON.parse(orderStringified);
  let price = 0;

  for (const item of order) {
    // calculate the number of toppings
    const numberOfToppings = Object.keys(item.toppings).length;
    // calculate the price of the item
    const itemPrice = 10 + numberOfToppings * 1;
    // add the price of the item to the total price
    price += itemPrice;
  }

  return price;
};

const createOrder = async (req, res) => {
  const { orderStringified } = req.body;
  const pizzaByteUserId = req.user?.id;

  if (!orderStringified) {
    return res
      .status(400)
      .json({ error: true, message: "Order stringified is required" });
  }

  const price = calculatePrice(orderStringified);

  try {
    const newOrder = await PizzaByteOrder.create({
      pizzaByteUserId,
      orderStringified,
      price,
    });

    return res.status(201).json({
      order: newOrder.toJSON(),
      message: "Order created successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "Something went wrong" });
  }
};

const getOrdersByUser = async (req, res) => {
  const pizzaByteUserId = req.user.id;

  try {
    const orders = await PizzaByteOrder.findAll({
      where: { pizzaByteUserId },
    });

    return res.status(200).json({ orders });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "Something went wrong" });
  }
};

module.exports = {
  createOrder,
  getOrdersByUser,
};
