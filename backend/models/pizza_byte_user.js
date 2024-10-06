"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const log = require("../logger");

module.exports = (sequelize, DataTypes) => {
  class PizzaByteUser extends Model {
    static associate(models) {
      this.hasMany(models.PizzaByteOrder, {
        foreignKey: "pizzaByteUserId",
      });
    }

    // Instance method to check password
    async checkPassword(password) {
      return await bcrypt.compare(password, this.password);
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
      hooks: {
        // Before creating a new user, hash the password
        beforeCreate: async (user) => {
          const hashedPassword = bcrypt.hashSync(user.password, SALT_ROUNDS);
          user.password = hashedPassword;
        },
        // Before creating a new user, hash the password
        beforeBulkCreate: async (users) => {
          for (const user of users) {
            const hashedPassword = bcrypt.hashSync(user.password, SALT_ROUNDS);
            user.password = hashedPassword;
          }
        },
      },
    },
  );
  return PizzaByteUser;
};
