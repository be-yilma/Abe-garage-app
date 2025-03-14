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

/**
 * Updates an existing service by ID.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { service_name, service_description } = req.body;

    // Validate input fields
    if (!service_name || typeof service_name !== "string") {
      return res.status(400).json({
        error: "Bad Request",
        message: "Service name is required and must be a valid string.",
      });
    }

    // Check if the service exists
    const existingService = await serviceService.getServiceById(id);
    if (!existingService) {
      return res.status(404).json({
        error: "Not Found",
        message: "Service with the specified ID not found.",
      });
    }

    // Update the service
    await serviceService.updateService(id, {
      service_name,
      service_description,
    });

    res.status(200).json({
      message: "Service updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in updateService:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the service exists
    const existingService = await serviceService.getServiceById(id);
    if (!existingService) {
      return res.status(404).json({
        error: "Not Found",
        message: "Service with the specified ID not found.",
      });
    }

    // Delete the service
    await serviceService.deleteServiceById(id);

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteService:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

module.exports = {
  addService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
