const passport = require('passport');
const {user} = require('../DB/index');

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();

const KEY = process.env.JWT_SECRET;
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = KEY;

passport.use(new JwtStrategy(opts,async function(payload,done){
    try {
        const users = await user.findOne({
            where:{
                id:payload.id
            },
            attributes:{
                exclude:['password','createdAt','updatedAt','profile_pic']
            }
        })
        // console.log(users);
        return done(null,users)
    } catch (error) {
        // console.log(error);
        return done(error)
    }
}));
