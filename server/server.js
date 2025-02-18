// Dotenv
if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

// Import Statement
const express = require('express');
const connectToDb = require("./config/connectToDb")

// Creating Express App
const app = express();

// Connect to DB
connectToDb();

// Routing
app.get('/', (req, res) => {
    res.send("Hello World!")
})

// Server
app.listen(process.env.PORT);