const { PizzaByteToppings } = require("../models");

const addToppings = async (req, res) => {
  const { toppingName } = req.body;

  if (!toppingName) {
    return res
      .status(400)
      .json({ error: true, message: "Topping name is required" });
  }

  try {
    // gather all toppings from the database
    const toppings = await PizzaByteToppings.findAll();
    // check if topping already exists
    const lowerCaseToppingName = toppingName.toLowerCase();
    const existingTopping = toppings.find(
      (topping) => topping.toppingName === lowerCaseToppingName,
    );

    if (existingTopping) {
      return res
        .status(400)
        .json({ error: true, message: "Topping already exists" });
    }

    // create topping
    const newTopping = await PizzaByteToppings.create({
      toppingName: lowerCaseToppingName,
    });

    return res.status(201).json({
      topping: newTopping.toJSON(),
      message: "Topping added successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Something went wrong" });
  }
};

const getToppings = async (req, res) => {
  try {
    const toppings = await PizzaByteToppings.findAll();

    return res.status(200).json({ toppings });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Something went wrong" });
  }
};

const deleteTopping = async (req, res) => {
  const { toppingName } = req.params;

  if (!toppingName) {
    return res
      .status(400)
      .json({ error: true, message: "Topping id is required" });
  }

  try {
    // check if topping exists
    const topping = await PizzaByteToppings.findOne({
      where: { toppingName: toppingName },
    });
    if (!topping) {
      return res
        .status(400)
        .json({ error: true, message: "Topping does not exist" });
    }

    // delete topping
    await topping.destroy();

    return res.status(200).json({ message: "Topping deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Something went wrong" });
  }
};

module.exports = {
  addToppings,
  getToppings,
  deleteTopping,
};
