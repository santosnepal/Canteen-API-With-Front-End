'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.changeColumn('users','phone_no' ,{
      type:Sequelize.BIGINT,
      allowNull:false
    });
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
