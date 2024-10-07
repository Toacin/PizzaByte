const { PizzaByteClassics } = require("../models");
const log = require("../logger");

const getAllClassics = async (req, res) => {
  try {
    const classics = await PizzaByteClassics.findAll();

    return res.status(200).json({ classics });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Something went wrong" });
  }
};

const addClassic = async (req, res) => {
  try {
    const { name, toppingsStringified } = req.body;

    if (!name || !toppingsStringified) {
      return res
        .status(400)
        .json({ error: true, message: "All fields are required" });
    }

    // check for duplicate classics name
    const existingClassics = await PizzaByteClassics.findAll();

    const lowerCaseName = name.toLowerCase();
    const existingClassic = existingClassics.find(
      (classic) => classic.name.toLowerCase() === lowerCaseName,
    );

    if (existingClassic) {
      return res
        .status(400)
        .json({ error: true, message: "Classic name already exists" });
    }

    // check for duplicates toppings
    const existingToppingsStringifiedSet = new Set();
    for (const classic of existingClassics) {
      const toppings = Object.keys(
        JSON.parse(classic.toppingsStringified),
      ).sort();
      log.info(toppings);
      existingToppingsStringifiedSet.add(JSON.stringify(toppings));
    }

    const newToppings = Object.keys(JSON.parse(toppingsStringified)).sort();
    log.info("newToppings");
    log.info(newToppings);

    log.info(existingToppingsStringifiedSet.has(JSON.stringify(newToppings)));

    if (existingToppingsStringifiedSet.has(JSON.stringify(newToppings))) {
      return res.status(400).json({
        error: true,
        message: "Classic with the same toppings already exists",
      });
    }

    const newClassic = await PizzaByteClassics.create({
      name: lowerCaseName,
      toppingsStringified,
    });

    return res.status(201).json({
      classic: newClassic.toJSON(),
      message: "Classic added successfully",
    });
  } catch (error) {
    log.error(error.toString());
    return res
      .status(500)
      .json({ error: true, message: "Something went wrong" });
  }
};

const deleteClassic = async (req, res) => {
  const { classicId } = req.params;

  if (!classicId) {
    return res
      .status(400)
      .json({ error: true, message: "Classic id is required" });
  }

  try {
    await PizzaByteClassics.destroy({ where: { id: classicId } });

    return res.status(200).json({ message: "Classic deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Something went wrong" });
  }
};

module.exports = {
  getAllClassics,
  addClassic,
  deleteClassic,
};
