// import express
const express = require('express');
// import router
const router = express.Router();
// import vehicle controller
const vehicleController = require('../controllers/vehicle.controller');
// add router
router.post('/api/vehicle', vehicleController.addNewVehicle);
// add route to get vehicles by customer id
router.get('/api/vehicles/:id', vehicleController.getVehiclesByCustomerId);
// add route to get vehicles by vehicle id
router.get('/api/vehicle/:id', vehicleController.getVehicleByVehicleId);
//  define route to update Vehicle
router.put('/api/vehicle/update-vehicle/:id', vehicleController.updateVehicleById);
// define route to delete vehicle by ID
router.delete('/api/vehicle/delete-vehicle/:id', vehicleController.deleteVehicleById);
// export router
module.exports = router;