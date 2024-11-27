// import express module
const express = require("express");
// import the router module
const router = express.Router();

const serviceController = require("../controllers/service.controller");

// Define the route for adding a new service
router.post("/api/service", serviceController.addService);
module.exports = router;
