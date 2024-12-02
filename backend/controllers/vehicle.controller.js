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

module.exports = { addVehicle };
