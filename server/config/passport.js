const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const keys = require('./keys');

const User = mongoose.model('users');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.JWT_SECRET_OR_KEY;

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then((user) => {
                if (user) {
                    // done
                    // 1st parameter: error
                    // 2nd parameter: user
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch((err) => { console.log(err); });
    }));
};