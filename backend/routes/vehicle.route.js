// import express module
const express = require("express");
// import the router module
const router = express.Router();

// import vehicleController

const vehicleController = require("../controllers/vehicle.controller");

// add post routes for add vehicle
router.post("/api/vehicle", vehicleController.addVehicle);

// define the route to get all vehicles for a specific customer
router.get(
  "/api/vehicle/:customer_id",
  vehicleController.getVehiclesByCustomerId
);
// Route to get vehicle by ID
router.get(
  "/api/vehicle/:customer_id/:vehicle_id",
  vehicleController.getVehicleById
);

/**
 * @route PUT /api/vehicle
 * @description Updates details of an existing customer vehicle.
 * @access Private
 */
router.put("/api/vehicle", vehicleController.updateVehicle);

// export the router
module.exports = router;
