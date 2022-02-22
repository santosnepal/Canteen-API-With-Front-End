const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = ({id}) =>{
    let generatedToken = jwt.sign({
        id,
    },process.env.JWT_SECRET,{expiresIn:30000});
    return generatedToken;
}