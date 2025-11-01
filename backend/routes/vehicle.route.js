// import express
const express = require('express');
// import router
const router = express.Router();
// import vehicle controller
const vehicleController = require('../controllers/vehicle.controller');
// add router
router.post('/api/vehicle', vehicleController.addNewVehicle);
// add route to get vehicles by customer id
router.get('/api/vehicle/:id', vehicleController.getVehiclesByCustomerId);
// export router
module.exports = router;