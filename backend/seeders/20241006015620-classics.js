"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("pizza_byte_classics", [
      {
        name: "Supreme",
        toppingsStringified: JSON.stringify({
          pepperoni: true,
          sausage: true,
          bacon: true,
        }),
      },
      {
        name: "Veggie Lovers",
        toppingsStringified: JSON.stringify({
          mushrooms: true,
          onions: true,
          olives: true,
        }),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pizza_byte_classics", null, {});
  },
};
