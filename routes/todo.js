const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
// const Skills = mongoose.model("Skills")
const Todo = mongoose.model('Todo')
router.get('/get-todos',(req,res) => {
    Todo.find()
    .then(savedTodos => {
        res.send(savedTodos)
    })
    .catch(err => {
        res.send({err})
    })
})
router.post('/add-todos' , (req,res) => {
    const { todo,isCompleted } = req.body
     Todo.find({todo})
    .then(savedTodo => {
    if(savedTodo.length !== 0){
       return res.status(422).send("The given work is already in todo list")
    }
    const newTodo = new Todo({
        todo,
        isCompleted
    })
    newTodo.save()
    res.send(newTodo)
    })
})

router.patch('/edit-todo/:id' ,(req,res) => {
    const {todo} = req.body
    
    Todo.find({todo})
    .then(savedTodo => {  
        if(savedTodo.length !== 0){
            return res.status(422).send({message:"todo already exist"})
        }
        Todo.findByIdAndUpdate(req.params.id , {todo},{ new: true })
        .then(updatedTodo => {
            res.json(updatedTodo)
        })
        .catch(err=> {
            res.json({"error":err})
        })
    })
})

router.delete('/delete-todo/:id' , (req,res) => {
    Todo.deleteOne({_id : req.params.id})
    .then( ()=> {
        res.send("todo deleted successully")
    })
    .catch(err => {
        res.send("error :",err)
    })
})

router.patch('/update-status/:id', (req,res) => {
    const {isCompleted} = req.body
    Todo.findByIdAndUpdate(req.params.id, {
       isCompleted 
    },{new:true})
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        res.json(err)
    })
})

module.exports = router