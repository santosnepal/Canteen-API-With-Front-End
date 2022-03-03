module.exports = (sequelize, type) => {
  return sequelize.define("roles", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: type.STRING(50),
      allowNull: false,
      unique: {
        args: true,
        msg: "Role already exists",
      },
    },
  });
};
