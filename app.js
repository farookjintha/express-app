require('dotenv').config();
const express = require('express');
const app = express();
const { db } = require('./connect');
const cors = require('cors') //Cross Origin Resource Sharing
//MongoDB Connection 

db();


const User = require('./models/users');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const quoteRoutes = require('./routes/quotes');


app.use(express.json()); //middleware
app.use(cors()); //middleware
app.use('/api', userRoutes); //custom middleware
app.use('/api', authRoutes); //custom middleware
app.use('/api', quoteRoutes);
app.use('/backend', (req, res) => {
    res.redirect('/api/users');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>{
    console.log(`Listening on Port ${PORT}..!`);
});