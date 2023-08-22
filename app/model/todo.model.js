const mongose = require('mongoose')

const TodoSchema = new mongose.Schema({
    userId:{
        type: String
    },
    title:{
        type: String,
        requred: true
    },
    description: {
        type: String,
        required: false,
    },
    progress: {
        type: Number,
        required: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    created_at:{
        type: Date,
        required: true,
        default: Date.now
    },
    completed_at:{
        type: Date,
        required: false,
    }
})

module.exports = mongose.model("Todo", TodoSchema)