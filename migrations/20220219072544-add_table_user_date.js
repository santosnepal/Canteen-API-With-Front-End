'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  
     await queryInterface.addColumn('users',
     'created_at', {
       allowNull: false,
       type: Sequelize.DATE
     },
     await queryInterface.addColumn('users',
     'updated_at',{
       allowNull:false,
       type:Sequelize.DATE
     })

);
     
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
