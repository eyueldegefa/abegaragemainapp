// import express module
const express = require('express');
// import dotenv to read .env file
require('dotenv').config();
// import the router
const router = require('./routes');
// create an express application
const app = express();
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