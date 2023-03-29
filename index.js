let express = require('express')
let cors = require('cors')
let app = express()
app.use(express.json())
app.use(cors())
require('./models/todo')
app.use(require('./routes/todo'))
const mongoose = require('mongoose')
const PORT = 5000
const {MONGOURI} = require('./keys')
mongoose.connect(MONGOURI)
mongoose.connection.on('connected',()=>{
    console.log("mongodb is connected")
})
mongoose.connection.on('error',(err)=>{
    console.log("error :",err)
})

app.listen(PORT , ()=>{
    console.log('server is running on port 5000')
})
