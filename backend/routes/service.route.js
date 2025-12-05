// import express
const express = require('express');
// import router
const router = express.Router();
// import auth middleware
const authMiddleware = require('../middlewares/auth.middleware');
// import controller
const serviceController = require('../controllers/service.controller');
// define a route to getAllServices
router.get("/api/services",[authMiddleware.verifyToken], serviceController.getAllServices);
// define a route to add new services
router.post("/api/services",[authMiddleware.verifyToken, authMiddleware.isAdmin], serviceController.addNewService);
// define a route to get Services by id
router.get("/api/service/:id",[authMiddleware.verifyToken], serviceController.getServiceById);
// define a route to Update Services by id
router.put("/api/service/edit-service/:id",[authMiddleware.verifyToken, authMiddleware.isAdminOrManager], serviceController.editService);
// define route to delete service by ID
router.delete("/api/service/delete-service/:id",[authMiddleware.verifyToken, authMiddleware.isAdmin], serviceController.deleteServiceById);
// export router
module.exports = router;