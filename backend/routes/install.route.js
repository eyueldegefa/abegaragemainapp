// import express module
const express = require('express');
// call express router
const router = express.Router();
// import install controller
const installController = require('../controllers/install.controller.js');
// create a route to handle the install request on get method
router.get('/install', installController.install);
// export the router
module.exports = router;