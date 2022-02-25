module.exports = (sequelize, type) => {
  return sequelize.define(
    "paid_account",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      user_id: {
        type: type.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      amount: {
        type: type.FLOAT,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
};
