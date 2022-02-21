const path = require('path');
const glob = require('glob');
exports.initRoutes = (app) => {
    const routers = glob.sync(path.resolve(`./routes/*.routes.js`));
    routers.forEach((route)=>{
        require(route)(app);
    });
};