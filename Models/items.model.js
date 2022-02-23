module.exports = (sequelize, type) => {
  return sequelize.define("items", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: type.STRING(255),
      allowNull: false,
    },
    category_id: {
      type: type.INTEGER,
      references: {
        model: "categories",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    price: {
      type: type.FLOAT,
      allowNull: false,
    },
    avilability: {
      type: type.INTEGER,
      allowNull: false,
    },
  });
};
