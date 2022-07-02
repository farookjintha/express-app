const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Authentication
router.post('/signup', async (req, res) => {
    try{
        let payload = req.body;
        payload.hashedPassword = await bcrypt.hash(payload.password, 10);
        let user = new User(payload);
        user.save((err, data) => {
            if(err){
                return res.status(401).send(err)
            }

            return res.status(201).send(data);
        })
    }catch(err){
        console.log(err);
    }
})

router.post('/signin',  (req, res) => {

    try{
        // const {email, password} = req.body; 
        let payload = req.body; 
        User.findOne({email: payload.email}, async (err, user) =>{
        if(err || !user){
            return res.status(400).json({
                err: 'User with that email does not exist. Please sign-up!'
            });
        }

        const validUser = await bcrypt.compare(payload.password, user.hashedPassword);

        if(validUser){
            const token = jwt.sign({_id: user._id}, "sdfksflakglsnvjbespc");
            //persist the token as 't' in cookie with expiry date
            res.cookie('t', token, {expire: new Date() + 9999});
            //return response with user and token to frontend client
            const {_id, name, email, role} = user;

            return res.status(200).json({token, user:{_id, email, name} });

        }else{
            return res.status(400).json({
                err: 'Invalid Username/password'
            });
        }
 
    })
    }catch(err){
        return res.status(500).json({
            err: 'Internal Server Error'
        });
    }
})


router.get('/signout', (req, res) => {
    res.clearCookie('t');
        res.json({
            message: "Successfully Signed out! "
        });
})

module.exports = router;