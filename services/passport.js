var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config.js/keys')
const mongoose = require('mongoose')
const User = mongoose.model('users')

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "http://localhost:5000/auth/google/callback",
        proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
        /* console.log('accessToken',accessToken)*/
        console.log('profile', profile)

        User.findOne({
            googleId: profile.id
        }).then((existingUser => {
            if (existingUser) {
                done(null, existingUser)
                console.log("user alredy exists")
            } else {
                new User({
                    googleId: profile.id,
                    googleName: profile.displayName
                }).save().then(user => done(null, user))
            }

        }))
    }
));