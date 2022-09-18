const express = require('express');
const User = require('../models/users');
const router = express.Router();
const path = require('path');




router.get('/', (req, res) => {
    res.status(200).send('Welcome to my App')
})


router.get('/users', (req, res) => {
    try{
        User.find((err, data) => {
            if(err){
                res.status(403).send("An error occured while getting users.");
            }

            res.status(200).send(data);
        })
    }catch(err){
        console.log(err);
    }
})

router.get('/users/:email', (req, res) => {
    try{
        User.find({email: req.params.email}, (err, data) => {
            if(err){
                res.status(403).send("An error occured while getting users.");
            }

            res.status(200).send(data);
        })
    }catch(err){
        console.log(err);
    }
});

router.post('/users', (req, res) => {
    let payload = req.body;
    console.log("Payload ", payload)

    if(Array.isArray(payload)){

        try{
            console.log("Payload Array: ", payload)
            User.collection.insert(payload,(err, data) => {
                if(err){
                    return res.status(401).send(err)
                }
    
                return res.status(201).send(data);
            })
        }catch(err){
            console.log(err);
        }
    }else if(typeof payload === 'object'){
        try{
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
    }

    // res.send('Creating new user')
})


router.put('/user/:email', (req, res) => {
    User.findOneAndUpdate({email: req.params.email}, {$set: req.body}, {new: true},
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error: "Error while updating user"
                });
            }

            return res.status(201).json(user);
        });
})

router.delete('/users/:id', (req, res) => {
    res.send('Deleting an user')
})



// router.params()

module.exports = router;