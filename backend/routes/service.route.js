// import express
const express = require('express');
// import router
const router = express.Router();
// import controller
const serviceController = require('../controllers/service.controller');
// define a route to getAllServices
router.get("/api/services", serviceController.getAllServices);
// define a route to add new services
router.post("/api/services", serviceController.addNewService);
// export router
module.exports = router;