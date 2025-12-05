// import express
const express = require('express');
// import router
const router = express.Router();
// import auth middleware
const authMiddleware = require('../middlewares/auth.middleware');
// import vehicle controller
const vehicleController = require('../controllers/vehicle.controller');
// add router
router.post('/api/vehicle',[authMiddleware.verifyToken, authMiddleware.isAdminOrManager], vehicleController.addNewVehicle);
// add route to get vehicles by customer id
router.get('/api/vehicles/:id',[authMiddleware.verifyToken, authMiddleware.isAdminOrManager], vehicleController.getVehiclesByCustomerId);
// add route to get vehicles by vehicle id
router.get('/api/vehicle/:id',[authMiddleware.verifyToken, authMiddleware.isAdminOrManager], vehicleController.getVehicleByVehicleId);
//  define route to update Vehicle
router.put('/api/vehicle/update-vehicle/:id',[authMiddleware.verifyToken, authMiddleware.isAdminOrManager], vehicleController.updateVehicleById);
// define route to delete vehicle by ID
router.delete('/api/vehicle/delete-vehicle/:id',[authMiddleware.verifyToken, authMiddleware.isAdmin], vehicleController.deleteVehicleById);
// export router
module.exports = router;