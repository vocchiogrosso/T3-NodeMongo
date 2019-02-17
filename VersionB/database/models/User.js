const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required: [true,"Please Provide Your Username"],
    },
    email: {
        type: String,
        required: [true,"Please Provide Your Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true,"Please Provide Your Password"]
    }
})

// Adds Middleware Before Continuing
UserSchema.pre('save', function(next){
    const user = this
    // 10, 100, 1000 for Rounds 
    // More Rounds Better But Slower
    bcrypt.hash(user.password, 10, function(error, encrytped){
        user.password = encrytped
        next()
    } )
})

module.exports = mongoose.model('User',UserSchema)