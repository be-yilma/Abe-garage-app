const db = require("../config/db.config");

/**
 * Checks if a service with the given name already exists.
 *
 * @param {string} serviceName - The name of the service to check.
 * @returns {boolean} - Returns true if the service exists, otherwise false.
 */
const checkServiceExists = async (serviceName) => {
  try {
    const query = `
      SELECT *
      FROM common_services
      WHERE service_name = ?;
    `;

    const rows = await db.query(query, [serviceName]);

    return rows.length > 0; // Returns true if at least one row exists
  } catch (error) {
    console.error("Error in serviceService.checkServiceExists:", error);
    throw error;
  }
};

/**
 * Adds a new service to the database.
 *
 * @param {object} serviceData - The service details.
 * @returns {number} - The ID of the newly created service.
 */
const addService = async (serviceData) => {
  try {
    const query = `
      INSERT INTO common_services (service_name, service_description)
      VALUES (?, ?);
    `;

    const result = await db.query(query, [
      serviceData.service_name,
      serviceData.service_description || null, // Allow null for optional fields
    ]);

    return result.insertId; // Return the ID of the newly inserted service
  } catch (error) {
    console.error("Error in serviceService.addService:", error);
    throw error;
  }
};
/**
 * Retrieves all services from the database.
 *
 * @returns {Array} - A list of all services.
 */
const getAllServices = async () => {
  try {
    const query = `
      SELECT 
        * 
      FROM 
        common_services;
    `;

    const rows = await db.query(query);

    return rows; // Return the list of services
  } catch (error) {
    console.error("Error in serviceService.getAllServices:", error);
    throw error;
  }
};

module.exports = { checkServiceExists, addService, getAllServices };
