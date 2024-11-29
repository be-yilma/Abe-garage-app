// import express module
const express = require("express");
// import the router module
const router = express.Router();

const serviceController = require("../controllers/service.controller");

// Define the route for adding a new service
router.post("/api/service", serviceController.addService);

// Define the route for retrieving all services
router.get("/api/services", serviceController.getAllServices);

// Define the route for getting a service by ID
router.get("/api/service/:id", serviceController.getServiceById);

// Update service details
router.put(
  "/api/service/:id",
  // verifyToken, // Validate token
  // isAdmin([2, 3]), // Restrict access to roles: manager (2) and admin (3)
  serviceController.updateService
);
// DELETE /api/service/:id - Delete a service by ID
router.delete("/api/service/:id",serviceController.deleteService);

module.exports = router;
