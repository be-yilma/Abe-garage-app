const vehicleService = require("../services/vehicle.service");

/**
 * Adds a new vehicle for a customer.
 *
 * @param {object} req - HTTP request object.
 * @param {object} res - HTTP response object.
 */
const addVehicle = async (req, res) => {
  const {
    customer_id,
    vehicle_year,
    vehicle_make,
    vehicle_model,
    vehicle_type,
    vehicle_mileage,
    vehicle_serial,
    vehicle_tag,
    vehicle_color,
  } = req.body;

  try {
    // // Validate required fields
    if (
      !customer_id ||
      !vehicle_model ||
      !vehicle_year ||
      !vehicle_make ||
      !vehicle_type ||
      !vehicle_mileage ||
      !vehicle_serial ||
      !vehicle_tag ||
      !vehicle_color
    ) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide all required fields",
      });
    }

    // Verify that the customer_id exists in the database
    const customerExists = await vehicleService.checkCustomerExists(
      customer_id
    );
    // console.log("test", customerExists);
    if (!customerExists) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Customer ID does not exist.",
      });
    }

    // Add the vehicle using the service layer
    await vehicleService.addVehicle({
      customer_id,
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_serial,
      vehicle_tag,
      vehicle_color,
    });

    res.status(201).json({
      message: "Vehicle created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in addVehicle:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

// function to get all vehicles
const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    return res.status(200).json({
      status: "success",
      vehicles,
    });
  } catch (error) {
    console.error("Error in getallVehicles:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

// Function to get all vehicles for a specific customer by customer_id
const getVehiclesByCustomerId = async (req, res) => {
  const { customer_id } = req.params;

  if (!customer_id) {
    return res.status(404).json({
      error: "Bad Request",
      message: "Invalide customer ID",
    });
  }

  try {
    // call the service to get all vehicles for the customer
    const vehicles = await vehicleService.getVehiclesByCustomerId(customer_id);

    if (vehicles.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: "No vehicles found for this customer",
      });
    }

    return res.status(200).json({
      status: "success",
      customer_id: customer_id,
      data: vehicles,
    });
  } catch (error) {
    console.error("Error in getVehiclesByCustomerId:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

// Function to get a specific vehicle by vehicle_id
const getVehicleById = async (req, res) => {
  const vehicle_id = parseInt(req.params.vehicle_id, 10);
  try {
    // Retrieve vehicle details from the service
    const vehicle = await vehicleService.getVehicleById(vehicle_id);

    if (!vehicle) {
      return res.status(404).json({
        error: "Not Found",
        message: "Vehicle not found",
      });
    }

    return res.status(200).json({ status: "success", vehicle });
  } catch (error) {
    console.error("Error in getVehicleById:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * Updates details of an existing vehicle.
 *
 * @param {object} req - HTTP request object.
 * @param {object} res - HTTP response object.
 */
const updateVehicle = async (req, res) => {
  const { vehicle_id } = req.params;
  try {
    const {
      vehicle_model,
      vehicle_year,
      vehicle_make,
      vehicle_type,
      vehicle_mileage,
      vehicle_serial,
      vehicle_tag,
      vehicle_color,
    } = req.body;

    // Check if the vehicle exists
    const vehicleExists = await vehicleService.checkVehicleExists(vehicle_id);
    if (!vehicleExists) {
      return res.status(404).json({
        error: "Not Found",
        message: "Vehicle not found",
      });
    }

    // Update the vehicle
    await vehicleService.updateVehicle(vehicle_id, {
      vehicle_model,
      vehicle_year,
      vehicle_make,
      vehicle_type,
      vehicle_mileage,
      vehicle_serial,
      vehicle_tag,
      vehicle_color,
    });

    res.status(200).json({
      status: "success",
      message: "Vehicle updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in updateVehicle:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

// function to delete a vehicle
const deleteVehicle = async (req, res) => {
  const { vehicle_id } = req.params;

  try {
    // check if the vehicle exists
    const vehicleExists = await vehicleService.checkVehicleExists(vehicle_id);
    if (!vehicleExists) {
      return res.status(200).json({
        error: " Not found ",
        message: "Vehicle not found",
      });
    }

    // Delete the vehicle
    await vehicleService.deleteVehicle(vehicle_id);

    return res.status(200).json({
      status: "success",
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteVehicle:", error.message);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

module.exports = {
  addVehicle,
  getVehiclesByCustomerId,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  getAllVehicles,
};
