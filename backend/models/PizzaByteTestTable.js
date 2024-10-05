"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PizzaByteTestTable extends Model {}
  PizzaByteTestTable.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PizzaByteTestTable",
      tableName: "pizza_byte_test_table",
      timestamps: true,
    },
  );
  return PizzaByteTestTable;
};
