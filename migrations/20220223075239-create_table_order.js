
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

  await queryInterface.createTable('orders', {
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
    item_id:{
      type:Sequelize.INTEGER,
      references:{
        model:'items',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    },
    quantity:{
      type:Sequelize.INTEGER,
      allowNull:false
    },
    status:{
      type:Sequelize.BOOLEAN,
      allowNull:false
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

