module.exports = (sequelize,type)=>{
    return sequelize.define('orders',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true,
          },
          user_id:{
            type:type.INTEGER,
            references:{
              model:'users',
              key:'id'
            },
            onDelete:'CASCADE',
            onUpdate:'CASCADE'
          },
          item_id:{
            type:type.INTEGER,
            references:{
              model:'items',
              key:'id'
            },
            onDelete:'CASCADE',
            onUpdate:'CASCADE'
          },
          quantity:{
            type:type.INTEGER,
            allowNull:false
          },
          status:{
            type:type.BOOLEAN,
            allowNull:false
          }
    })
}