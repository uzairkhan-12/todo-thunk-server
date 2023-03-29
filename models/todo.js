const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({
    todo:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        required:false
    }
})

mongoose.model("Todo",todoSchema)