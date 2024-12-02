// import express module
const express = require("express");
// import the router module
const router = express.Router();

// import vehicleController

const vehicleController = require("../controllers/vehicle.controller");

// add post routes for add vehicle
router.post("/api/vehicle", vehicleController.addVehicle);

// export the router
module.exports = router;
