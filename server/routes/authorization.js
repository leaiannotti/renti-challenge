const express = require('express')
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const router = express.Router()
require('dotenv').config()

//router.use(expressJwt({ secret: process.env.JWT_SECRET, algorithms: ['sha1', 'RS256', 'HS256'] }).unless({ path: ['/auth/login', '/auth/register'] }));

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send({ message: 'User does not exists' });
        }
        //TO-DO try to hash the password in the db
        if (password != user.password ) {
            return res.status(401).send({ message: 'Incorrect password' });
        }
        // create a JWT token
        const token = jwt.sign({ user: user.id }, process.env.JWT_SECRET);
        // send the token to the user
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, username, password } = req.body;

        if(!username)
        {
            return res.status(400).send({ message: 'Username is mandatory' });
        }
        
        if(!password)
        {
            return res.status(400).send({ message: 'Password is mandatory' });
        }

        const userExists = await User.findOne({ username });

        if(userExists)
        {
            return res.status(400).send({ message: 'Username already exists' });
        }

        const user = new User({
            firstname: firstname,
            lastname: lastname,
            username:username,
            password:password,
        })

        await user.save();
        
        res.status(200).send(`User ${user.username} has been created successfully`);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router