const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }, //pending,done
    ip: { type: String, required: true } //(personal, official, family)
})

const Usermodel = mongoose.model('user', userschema);

module.exports = { Usermodel };