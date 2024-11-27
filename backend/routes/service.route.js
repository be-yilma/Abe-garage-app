// import express module
const express = require("express");
// import the router module
const router = express.Router();

const serviceController = require("../controllers/service.controller");

// Define the route for adding a new service
router.post("/api/service", serviceController.addService);

// Define the route for retrieving all services
router.get("/api/services", serviceController.getAllServices);
module.exports = router;
