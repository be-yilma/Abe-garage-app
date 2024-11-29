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
/**
 * Retrieves a service by its ID from the database.
 *
 * @param {number} serviceId - The ID of the service to retrieve.
 * @returns {object|null} - The service details, or null if not found.
 */
const getServiceById = async (serviceId) => {
  try {
    const query = `
      SELECT 
        service_id, 
        service_name, 
        service_description 
      FROM 
        common_services 
      WHERE 
        service_id = ?;
    `;

    const rows = await db.query(query, [serviceId]);

    return rows[0] || null; // Return the first result or null if not found
  } catch (error) {
    console.error("Error in serviceService.getServiceById:", error.message);
    throw error;
  }
};

/**
   * Updates a service in the database.
   *
   * @param {number} serviceId - The ID of the service to update.
   * @param {object} updatedFields - The fields to update.
   * @returns {void}
   */
const updateService = async (serviceId, updatedFields) => {
  try {
    const query = `
      UPDATE common_services
      SET 
        service_name = ?, 
        service_description = ?
      WHERE 
        service_id = ?;
    `;

    await db.query(query, [
      updatedFields.service_name,
      updatedFields.service_description || null,
      serviceId,
    ]);
  } catch (error) {
    console.error("Error in serviceService.updateService:", error.message);
    throw error;
  }
};
/**
 * Deletes a service by ID.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
/**
 * Deletes a service by its ID.
 *
 * @param {number} serviceId - The ID of the service to delete.
 */
const deleteServiceById = async (serviceId) => {
  try {
    const query = "DELETE FROM common_services WHERE service_id = ?";
    await db.query(query, [serviceId]);
  } catch (error) {
    console.error("Error in deleteServiceById:", error.message);
    throw error;
  }
};

module.exports = { checkServiceExists, addService, getAllServices ,getServiceById,updateService,deleteServiceById}