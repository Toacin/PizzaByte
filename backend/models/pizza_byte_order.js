"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PizzaByteOrder extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.PizzaByteUser, {
        foreignKey: "pizzaByteUserId",
        onDelete: "SET NULL",
      });
    }
  }
  PizzaByteOrder.init(
    {
      pizzaByteUserId: DataTypes.INTEGER,
      orderStringified: DataTypes.STRING,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "PizzaByteOrder",
      tableName: "pizza_byte_order",
    },
  );
  return PizzaByteOrder;
};
