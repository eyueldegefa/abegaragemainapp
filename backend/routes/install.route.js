// import express module
const express = require('express');
// call express router
const router = express.Router();
// import auth middleware
const authMiddleware = require('../middlewares/auth.middleware.js');
// import install controller
const installController = require('../controllers/install.controller.js');
// create a route to handle the install request on get method
router.get('/install', [authMiddleware.verifyToken, authMiddleware.isAdmin], installController.install);
// export the router
module.exports = router;