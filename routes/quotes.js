const express = require('express');
const router = express.Router();
const Quotes = require('../models/quotes');
const {isAdmin} = require('../utils/adminValidation');

router.get('/quotes', (req, res) => {
    try{
        Quotes.find((err, quotes) => {
            if(err){
                res.status(403).send("An error occured while getting quotes.");
            }

            res.status(200).send(quotes);
        })
    }catch(err){
        console.log(err);
    }
})

router.get('/quotes/:id', (req, res) => {
    try{
        Quotes.find({_id: req.params.id}, (err, quote) => {
            if(err){
                res.status(403).send("An error occured while getting users.");
            }

            res.status(200).send(quote);
        })
    }catch(err){
        console.log(err);
    }
});

//Add new quote
router.post('/add-quotes',  async (req, res) => {
    try{
        let quote = new Quotes(req.body);
        quote.save((err, quote) => {
            if(err){
                return res.status(401).send(err)
            }

            return res.status(201).send(quote);
        })
    }catch(err){
        console.log(err);
    }
})

//Update Quote
router.put('/update-quotes/:id',  (req, res) => {

    try{
        Quotes.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true},
            (err, quote) => {
                if(err){
                    return res.status(400).json({
                        error: "Error while updating quote"
                    });
                }
    
                return res.status(201).json(quote);
            });
    }catch(err){
        return res.status(500).send("Internal Server Error")
    }
})


router.delete('/delete-quote/:id',(req, res) => {
    try{
        Quotes.deleteOne({_id: req.params.id},
            (err, quote) => {
                if(err){
                    return res.status(400).json({
                        error: "Error while deleting quote"
                    });
                }
    
                return res.status(200).send("Quote Deleted Successfully...");

            });
    }catch(err){
        return res.status(500).send("Internal Server Error")
    }
})

module.exports = router;