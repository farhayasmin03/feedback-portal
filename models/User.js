const mongoose = require('mongoose')
//const Schema= mongoose.Schema same as const { Schema } = mongoose

const { Schema } = mongoose

const userSchema = new Schema({
    googleId: String,
    googleName:String
})

mongoose.model('users',userSchema)