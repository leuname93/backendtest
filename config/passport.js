const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const ObjectID = require('mongodb').ObjectID;
const db = require('../db')
require('dotenv').config();

const dbName = process.env.DB_NAME;
const collectionName = "Usuario";

module.exports = (access,passport) => {
    let opts = {};
    
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = process.env.SecretKey;

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log("DBNAME", dbName)
        console.log("PAYLOAD", jwt_payload)
        db.initialize(dbName, collectionName, async dbCollection =>{
            const isAuth = await dbCollection.findOne({ _id: ObjectID(jwt_payload.data._id)});
            console.log("AUTH", isAuth)
            console.log("ACCESS",access)
            if(!isAuth){
                return done(null, false)
            }
            if(isAuth.Perfil === 'Administrador'){
                return done(null, isAuth)
            }
            if(isAuth.Perfil === 'Inquilino' && access === 'tiendas'){
                return done(null, isAuth)
            }
            return done(null, false)
        })
    }));
}