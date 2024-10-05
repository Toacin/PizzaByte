const { PizzaByteTestTable } = require("../models");

const testController = async (req, res) => {
  const testTable = await PizzaByteTestTable.findAll();
  const firstName = testTable[0].name;
  const returnString = `Hello ${firstName}!`;
  res.json(returnString);
};

module.exports = {
  testController,
};
