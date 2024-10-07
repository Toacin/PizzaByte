const { PizzaByteToppings } = require("../models");

const addToppings = async (req, res) => {
  const { toppingName } = req.body;

  if (!toppingName) {
    return res
      .status(400)
      .json({ error: true, message: "Topping name is required" });
  }

  try {
    const lowerCaseToppingName = toppingName.toLowerCase();

    // Check if the topping already exists directly in the database
    const existingTopping = await PizzaByteToppings.findOne({
      where: { toppingName: lowerCaseToppingName },
    });

    if (existingTopping) {
      return res
        .status(400)
        .json({ error: true, message: "Topping already exists" });
    }

    // Create new topping
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

const updateTopping = async (req, res) => {
  const { toppingName, originalToppingName } = req.body;

  if (!toppingName || !originalToppingName) {
    return res
      .status(400)
      .json({ error: true, message: "Missing required field" });
  }

  try {
    // Find the original topping by its name
    const originalTopping = await PizzaByteToppings.findOne({
      where: { toppingName: originalToppingName },
    });

    if (!originalTopping) {
      return res
        .status(404)
        .json({ error: true, message: "Original topping not found" });
    }

    // Check if a topping with the new name already exists
    const lowerCaseToppingName = toppingName.toLowerCase();
    const existingTopping = await PizzaByteToppings.findOne({
      where: { toppingName: lowerCaseToppingName },
    });

    if (existingTopping) {
      return res.status(400).json({
        error: true,
        message: "Topping with the new name already exists",
      });
    }

    // Update the toppingName of the original topping
    originalTopping.toppingName = lowerCaseToppingName;
    await originalTopping.save();

    return res.status(200).json({
      topping: originalTopping.toJSON(),
      message: "Topping updated successfully",
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
  updateTopping,
  deleteTopping,
};
