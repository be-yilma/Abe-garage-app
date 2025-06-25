// import express module
const express = require("express");
// import the router module
const router = express.Router();

// import vehicleController

const vehicleController = require("../controllers/vehicle.controller");

// import middleware
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

// add post routes for add vehicle
router.post(
  "/api/add-vehicle",
  verifyToken,
  isAdmin,
  vehicleController.addVehicle
);

// Define the route to get all vehicles
router.get(
  "/api/vehicles",
  verifyToken,
  isAdmin,
  vehicleController.getAllVehicles
);

// define the route to get all vehicles for a specific customer
router.get(
  "/api/vehicle/:customer_id",
  verifyToken,
  isAdmin,
  vehicleController.getVehiclesByCustomerId
);

// Route to get vehicle by vehicle id - one vehicle
router.get(
  "/api/single-vehicle/:vehicle_id",
  verifyToken,
  isAdmin,
  vehicleController.getVehicleById
);

/**
 * @route PUT /api/vehicle
 * @description Updates details of an existing customer vehicle.
 * @access Private
 */
router.put(
  "/api/vehicle/:vehicle_id",
  verifyToken,
  isAdmin,
  vehicleController.updateVehicle
);

// Define the route to delete a customer vehicle
router.delete(
  "/api/vehicle/:vehicle_id",
  verifyToken,
  isAdmin,
  vehicleController.deleteVehicle
);

// export the router
module.exports = router;
