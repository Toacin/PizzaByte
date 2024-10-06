"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add the 'role' column to the 'pizza_byte_user' table
    await queryInterface.addColumn("pizza_byte_user", "role", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "user",
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the 'role' column from the 'pizza_byte_user' table
    await queryInterface.removeColumn("pizza_byte_user", "role");
  },
};
