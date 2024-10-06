"use strict";

/** @type {import('sequelize-cli').Migration} */

const { PizzaByteUser } = require("../models");
module.exports = {
  async up(queryInterface, Sequelize) {
    // using model to leverage hooks
    await PizzaByteUser.bulkCreate([
      {
        firstName: "John",
        email: "johnDoe@pizzaByte.com",
        password: "password1",
      },
      {
        firstName: "Jane",
        email: "janeDoe@pizzaByte.com",
        password: "password2",
      },
    ]);
  },

  // won't be used in this project
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pizza_byte_user", null, {});
  },
};
