const serviceService = require("../services/service.service");

/**
 * Adds a new service.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
const addService = async (req, res) => {
  try {
    const { service_name, service_description } = req.body;

    // Validate required fields
    if (!service_name) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide all required fields",
      });
    }

    // Check if the service already exists
    const existingService = await serviceService.checkServiceExists(
      service_name
    );
    if (existingService) {
      return res.status(400).json({
        error: "Bad Request",
        message: "A service with this name already exists.",
      });
    }

    // Add the service to the database
    const newService = await serviceService.addService({
      service_name,
      service_description,
    });

    res.status(201).json({
      message: "Service created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in addService:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * Retrieves a list of all services.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
const getAllServices = async (req, res) => {
  try {
    // Retrieve all services from the service layer
    const services = await serviceService.getAllServices();

    res.status(200).json({
      services,
    });
  } catch (error) {
    console.error("Error in getAllServices:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the service by ID from the service layer
    const service = await serviceService.getServiceById(id);
    // console.log(service);

    if (!service) {
      return res.status(404).json({
        error: "Not Found",
        message: "Service not found",
      });
    }

    res.status(200).json(service);
  } catch (error) {
    console.error("Error in getServiceById:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

module.exports = { addService, getAllServices, getServiceById };
