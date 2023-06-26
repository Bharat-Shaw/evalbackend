const express = require('express');
const { connection } = require('./config/db')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');
const { Todomodel } = require('./models/Todo.model');
const todoroute = require('./routes/todo');
const authroute = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(cors());

const authmiddleware=(req, res, next)=>{
    const {authorization}=req.headers;
    const userav=(authorization.split(' ')[1]);
    if(!userav){
        res.send('Please login');
    }else {
        jwt.verify(userav, process.env.SECRET, (err, decoded)=>{
            const {UID}=decoded;
            req.UID=UID;
            if(decoded){
                next();
            }else {
                res.send("Please login");
            }
        })
    }
}

app.use('/user', authroute)
app.use('/', authmiddleware, todoroute)

app.listen(4000, async () => {
    try {
        await connection;
        console.log('connected to database')
    } catch (error) {
        console.log('error while connecting db')
    }
    console.log('server started')
})

