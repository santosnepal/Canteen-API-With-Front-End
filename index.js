const express = require('express');
const {sequelize} = require('./DB/index');
const {initRoutes} = require('./routes');
const app = express();
app.use(express.json());
initRoutes(app);
sequelize.authenticate().then(()=>{
    //  sequelize.sync({force:true})
     console.log("Database connected successfully")
     }
 ).catch(err=>{
     console.log(err.message)
});











app.use((err,req,res,next) => {
    err.success = false;
    err.status = err.status || 500;
    err.message = err.message || 'Internal Server Error';
    err.data = err.data || null;
    res.status(err.status).json({
        success:err.success,
        status:err.status,
        message:err.message,
        data:err.data
    });
})
app.listen(9001,()=>{
    console.log('Server started at localhost:9001');
})