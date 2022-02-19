'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
        unique:true
      },
      name:{
        type:Sequelize.STRING(255),
        allowNull:false
      },
      email:{
        type:Sequelize.STRING(255),
        allowNull:false,
        unique:true,
      },
      phone_no:{
        type:Sequelize.INTEGER,
        allowNull:false,
        unique:true
      },
      profile_pic:{
        type:Sequelize.STRING(255),
        allowNull:false
      },
      password:{
        type:Sequelize.STRING(255),
        allowNull:false
      }
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
