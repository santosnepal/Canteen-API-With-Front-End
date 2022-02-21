module.exports = (sequelize,types)=>{
    return sequelize.define('users_roles',{
        id: {
            type: types.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          user_id: {
            type: types.INTEGER,
            references: {
              model: "users",
              key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          role_id: {
            type: types.INTEGER,
            references: {
              model: "roles",
              key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
    })
}