const mongoose = require('mongoose');

const todoschema = mongoose.Schema({
    taskname: { type: String, required: true },
    status: { type: String, required: true }, //pending,done
    tag: { type: String, required: true }, //(personal, official, family)
    author_id: { type: String, required: true }
})

const Todomodel=mongoose.model('todo', todoschema);

module.exports={Todomodel};