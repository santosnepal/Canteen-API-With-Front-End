'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('credit_account', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      user_id:{
        type:Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      order_id:{
        type:Sequelize.INTEGER,
        references:{
          model:'orders',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
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