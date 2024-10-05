"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PizzaByteUser extends Model {
    static associate(models) {
      this.hasMany(models.PizzaByteOrder, {
        foreignKey: "pizzaByteUserId",
      });
    }
  }
  PizzaByteUser.init(
    {
      firstName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PizzaByteUser",
      tableName: "pizza_byte_user",
    },
  );
  return PizzaByteUser;
};
