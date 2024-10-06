"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Alter the existing table to change the onDelete behavior. This allows guest orders to remain in the database even if the user is deleted.
    await queryInterface.changeColumn("pizza_byte_order", "pizzaByteUserId", {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "pizza_byte_user",
        },
        key: "id",
      },
      onDelete: "SET NULL",
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Rollback to previous state, set onDelete back to CASCADE
    await queryInterface.changeColumn("pizza_byte_order", "pizzaByteUserId", {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "pizza_byte_user",
        },
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    });
  },
};
