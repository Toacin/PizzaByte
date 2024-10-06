"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PizzaByteClassics extends Model {}
  PizzaByteClassics.init(
    {
      name: DataTypes.STRING,
      toppingsStringified: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PizzaByteClassics",
      tableName: "pizza_byte_classics",
    },
  );
  return PizzaByteClassics;
};
