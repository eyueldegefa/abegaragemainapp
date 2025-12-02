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
// define a route to get Services by id
router.get("/api/service/:id", serviceController.getServiceById);
// define a route to Update Services by id
router.put("/api/service/edit-service/:id", serviceController.editService);
// define route to delete service by ID
router.delete("/api/service/delete-service/:id", serviceController.deleteServiceById);
// export router
module.exports = router;