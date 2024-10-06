"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("pizza_byte_toppings", [
      {
        toppingName: "pepperoni",
      },
      {
        toppingName: "mushrooms",
      },
      {
        toppingName: "onions",
      },
      {
        toppingName: "sausage",
      },
      {
        toppingName: "bacon",
      },
      {
        toppingName: "pineapple",
      },
      {
        toppingName: "jalapenos",
      },
      {
        toppingName: "olives",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pizza_byte_toppings", null, {});
  },
};
