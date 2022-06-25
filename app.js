require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql')
const { db } = require('./connect');
//MongoDB Connection 

db();




const User = require('./models/users');
const userRoutes = require('./routes/user');

app.use(express.json());
app.use('/api', userRoutes);
app.use('/backend', (req, res) => {
    res.redirect('/api/users');
    
});

const port = process.env.port || 4001; 
app.listen(port, () =>{
    console.log(`Listening on Port ${port}..!`);
});