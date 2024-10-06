"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PizzaByteToppings extends Model {}
  PizzaByteToppings.init(
    {
      toppingName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PizzaByteToppings",
      tableName: "pizza_byte_toppings",
    },
  );
  return PizzaByteToppings;
};
