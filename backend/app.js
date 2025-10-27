// import express module
const express = require('express');
// import dotenv to read .env file
require('dotenv').config();
// import sanitize module to prevent SQL injection attacks
const sanitize = require('sanitize');
// import cors module to allow cross-origin requests
const cors = require('cors');
// add corsOptions to allow requests from the frontend
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200 
};
// import the router
const router = require('./routes');
// create an express application
const app = express();
// use json middleware to parse json requests
app.use(express.json());
// use cors middleware
app.use(cors(corsOptions));
// add sanitize as middleware
app.use(sanitize.middleware);
// add routes to the application as middleware
app.use(router);
// create a variable to hold our port number
const PORT = process.env.PORT;
// start our web server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// export the app module
module.exports = app;