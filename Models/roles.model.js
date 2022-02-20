module.exports = (sequelize,type) =>{
    return sequelize.define('roles',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true,
            unique:true
          },
          Name:{
            type: type.ENUM("Admin", "User", "Staff"),
            allowNull:false,
          }
    })
}