"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "pizza_byte_test_table",
      [
        {
          name: "John Doe",
        },
        {
          name: "Jane Doe",
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pizza_byte_test_table", null, {});
  },
};
