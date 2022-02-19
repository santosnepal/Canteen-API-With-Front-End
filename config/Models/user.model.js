module.exports = (sequelize, type) => {
  return sequelize.define("users", {
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
    email: {
      type: type.STRING(255),
      allowNull: false,
      unique: true,
    },
    phone_no: {
      type: type.INTEGER,
      allowNull: false,
      unique: true,
    },
    profile_pic: {
      type: type.STRING(255),
      allowNull: false,
    },
    password: {
      type: type.STRING(255),
      allowNull: false,
    },
  });
};
