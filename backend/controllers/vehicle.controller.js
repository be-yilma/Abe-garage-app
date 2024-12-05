const vehicleService = require("../services/vehicle.service");

/**
 * Adds a new vehicle for a customer.
 *
 * @param {object} req - HTTP request object.
 * @param {object} res - HTTP response object.
 */
const addVehicle = async (req, res) => {
  try {
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

    // Validate required fields
    if (
      !customer_id ||
      !vehicle_year ||
      !vehicle_make ||
      !vehicle_model ||
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
    console.log("test", customerExists);
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

// Function to get all vehicles for a specific customer by customer_id

const getVehiclesByCustomerId = async (req, res) => {
  try {
    const { customer_id } = req.params;

    // Get the vehicles using the service layer
    const vehicles = await vehicleService.getVehiclesByCustomerId(customer_id);

    return res.status(200).json({
      customer_id: customer_id,
      vehicles: vehicles,
    });
  } catch (error) {
    console.error("Error in getVehiclesByCustomerId:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

// Function to get a specific vehicle by customer_id and vehicle_id

const getVehicleById = async (req, res) => {
  const { customer_id, vehicle_id } = req.params;

  // validate parameters
  if (isNaN(customer_id) || isNaN(vehicle_id)) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Invalid customer or vehicle ID",
    });
  }

  try {
    // Retrieve vehicle details from the service
    const vehicle = await vehicleService.findVehicleById(
      customer_id,
      vehicle_id
    );

    console.log("vehicle found cotroller: " + vehicle);

    if (!vehicle) {
      return res.status(404).json({
        error: "Not Found",
        message: "Vehicle not found",
      });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    console.error("Error in getVehicleById:", error.message);
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
  try {
    const {
      vehicle_id,
      customer_id,
      vehicle_model,
      vehicle_year,
      vehicle_make,
      vehicle_type,
      vehicle_mileage,
      vehicle_serial,
      vehicle_tag,
      vehicle_color,
    } = req.body;

    // Validate required fields
    if (
      !vehicle_id ||
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

    // Check if the vehicle exists
    const vehicleExists = await vehicleService.findVehicleById(
      customer_id,
      vehicle_id
    );
    if (!vehicleExists) {
      return res.status(404).json({
        error: "Not Found",
        message: "Vehicle not found",
      });
    }

    // Update the vehicle
    await vehicleService.updateVehicle({
      vehicle_id,
      customer_id,
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

module.exports = {
  addVehicle,
  getVehiclesByCustomerId,
  getVehicleById,
  updateVehicle,
};
