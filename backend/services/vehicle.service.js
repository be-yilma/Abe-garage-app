const db = require("../config/db.config");

/**
 * Checks if a customer with the given ID exists.
 *
 * @param {number} customer_id - The ID of the customer to check.
 * @returns {Promise<boolean>} - True if the customer exists, false otherwise.
 */
const checkCustomerExists = async (customer_id) => {
  try {
    const query = `
    SELECT customer_id FROM  customer_identifier 
    WHERE customer_id = ?;
  `;
    const customer = await db.query(query, [customer_id]);
    console.log(customer);
    if (customer) {
      return true; // customer exists already
    } else {
      return false; // no customer found
    }
  } catch (error) {
    console.error("Error checking customer existence:", error);
    throw new Error("Database error while checking customer existence");
  }
};

/**
 * Adds a new vehicle for a customer.
 *
 * @param {object} vehicleDetails - The details of the vehicle to add.
 * @returns {Promise<void>}
 */
const addVehicle = async (vehicleDetails) => {
  try {
    const query = `
    INSERT INTO customer_vehicle_info (
      customer_id,
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_serial,
      vehicle_tag,
      vehicle_color
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
    await db.query(query, [
      vehicleDetails.customer_id,
      vehicleDetails.vehicle_year,
      vehicleDetails.vehicle_make,
      vehicleDetails.vehicle_model,
      vehicleDetails.vehicle_type,
      vehicleDetails.vehicle_mileage,
      vehicleDetails.vehicle_serial,
      vehicleDetails.vehicle_tag,
      vehicleDetails.vehicle_color,
    ]);
  } catch (error) {
    console.error("Error adding vehicle:", error);
    throw new Error("Database error while adding vehicle");
  }
};

module.exports = { checkCustomerExists, addVehicle };
