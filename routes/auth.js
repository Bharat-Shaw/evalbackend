const express = require('express');
const router = express.Router();
let jwt = require('jsonwebtoken');
const { Usermodel } = require('../models/User.model');
require('dotenv').config();
const bcrypt = require('bcrypt')

// signup
router.post('/signup', async (req, res) => {
    const { name, email, password, ip } = req.body;
    // console.log('hello')
    const User = await Usermodel.findOne({ email })
    if (User) {
        res.send('User Already exist');
    } else {
        const hashpassword = bcrypt.hashSync(password, 6);
        const newuser = new Usermodel({
            name,
            email,
            password: hashpassword,
            ip
        });
        await newuser.save();
        res.send("Sign Up Successful");
    }
})

// login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await Usermodel.findOne({ email });
    if (!user) {
        res.send('Please Sign Up');
    } else {
        const hash = user.password;
        const veruser = bcrypt.compareSync(password, hash);
        if (veruser) {
            const token = jwt.sign({ UID: user._id }, process.env.SECRET);
            res.send({ msg: token });
        }
    }
})

module.exports = router;