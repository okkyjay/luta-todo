const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    name: {
        type:String
    },
    password: {
        type: String
    },
    created_at:{
        type: Date,
        required: true,
        default: Date.now
    }
})
module.exports = mongoose.model('Users', userSchema)