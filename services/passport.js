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
        callbackURL: "/auth/google/callback",
        proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log('profile', profile)

        var existingUser = await User.findOne({ googleId: profile.id})
        if(existingUser){
            done(null, existingUser) 
        }else{
            var newUser = await new User({
                googleId: profile.id,
                googleName: profile.displayName}).save()
                done(null,newUser)
        }
    }
));