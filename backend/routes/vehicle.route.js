// import express
const express = require('express');
// import router
const router = express.Router();
// import vehicle controller
const vehicleController = require('../controllers/vehicle.controller');
// add router
router.post('/api/vehicles', vehicleController.addNewVehicle);
// export router
module.exports = router;