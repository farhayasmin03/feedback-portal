const express = require('express');
var mongoose = require('mongoose')
const keys = require('./config.js/keys')
var cookieSession = require('cookie-session')
var passport = require('passport');
require('./models/User')
require('./services/passport')


mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected")
})
const app = express();

app.use(cookieSession({
    name: 'session',
    keys: [keys.cookieKey],
    maxAge: 30 * 24 * 60 * 60 * 1000 
}))
app.use(passport.initialize())
app.use(passport.session())
require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT);