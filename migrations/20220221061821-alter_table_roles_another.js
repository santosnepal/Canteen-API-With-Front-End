'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.changeColumn('roles','name',{
    type:Sequelize.STRING(50),
    allowNull:false
  })
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
