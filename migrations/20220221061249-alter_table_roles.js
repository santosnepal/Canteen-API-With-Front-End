'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.renameColumn('roles','Name','name')
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
