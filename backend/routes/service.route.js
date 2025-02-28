// import express module
const express = require("express");
// import the router module
const router = express.Router();
// import middleware
const serviceController = require("../controllers/service.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

// Define the route for adding a new service
router.post("/api/service", verifyToken, isAdmin, serviceController.addService);

// Define the route for retrieving all services
router.get("/api/services", serviceController.getAllServices);

// Define the route for getting a service by ID
router.get(
  "/api/service/:id",
  verifyToken,
  isAdmin,
  serviceController.getServiceById
);

// Update service details
router.put(
  "/api/service/:id",
  verifyToken,
  isAdmin,
  serviceController.updateService
);
// DELETE /api/service/:id - Delete a service by ID
router.delete(
  "/api/service/:id",
  verifyToken,
  isAdmin,
  serviceController.deleteService
);

module.exports = router;
