require('dotenv').config();
const express = require('express');
const app = express();
const { db } = require('./connect');
const {requireSignIn, isAuth} = require('./utils/authentications');
const {isAdmin} = require('./utils/adminValidation');

const cors = require('cors') //Cross Origin Resource Sharing
//MongoDB Connection 

db();


const User = require('./models/users');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const quoteRoutes = require('./routes/quotes');


app.use(express.json()); //middleware
app.use(cors()); //middleware
app.use('/api', authRoutes); //Authentication Routes:
//Authorization - who can access what
app.use('/api', requireSignIn, isAuth, isAdmin, userRoutes); // Only admin user can access
app.use('/api', requireSignIn, isAuth, quoteRoutes); // Normal Application user and Admin User can access 

// app.use('/api', requireSignIn, isAuth, userRoutes);  //basic routes
// app.use('/api', requireSignIn, isAuth, quoteRoutes);  // basic routes
app.use('/backend', (req, res) => {
    res.redirect('/api/users');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>{
    console.log(`Listening on Port ${PORT}..!`);
});