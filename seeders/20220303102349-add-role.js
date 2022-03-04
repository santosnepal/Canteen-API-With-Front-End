"use strict";

const { DATE } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("roles", [
      {
        name: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "user",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
