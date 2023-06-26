const express = require('express');
const { Todomodel } = require('../models/Todo.model');
const router = express.Router();

// getdata
router.get('/todo/:_id', async (req, res) => {
    const { _id } = req.params;
    const todoitem = await Todomodel.findById(_id);
    res.send(todoitem)
})

router.get('/todo', async (req, res) => {
    const query = req.query;
    const user_id=req.UID;
    console.log(query, user_id)
    const todoitems = await Todomodel.find({ author_id: user_id, ...query});
    res.send(todoitems);
})

// create
router.post('/todo', async (req, res) => {
    const { taskname, status, tag } = req.body;
    const author_id = req.UID;
    const newtask = new Todomodel({
        taskname,
        status,
        tag,
        author_id
    })
    await newtask.save();
    res.send("Post Created");
})

// update
router.put('/todo/update/:_id', async (req, res) => {
    const { _id } = req.params;
    const { taskname, status, tag } = req.body;
    try {
        const updatedtask = await Todomodel.findByIdAndUpdate(_id, { taskname: taskname, status: status, tag: tag })
        if(!updatedtask){
            res.status(404).send('No post found');
        }else {
            res.send('Post updated');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
})

// delete
router.delete('/todo/delete/:_id', async (req, res) => {
    const {_id}=req.params;
    try {
        const deletedtask = await Todomodel.findByIdAndDelete(_id)
        if(!deletedtask){
            res.status(404).send('No post found');
        }else {
            res.send('Post deleted');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
})

module.exports = router;