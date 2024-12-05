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

// function to retrieve all vehicle details for a specific customer
const getVehiclesByCustomerId = async (customer_id) => {
  try {
    const query = `
        SELECT * FROM customer_vehicle_info WHERE customer_id =?;
        `;
    const vehicles = await db.query(query, [customer_id]);
    return vehicles; // return an array of vehicle objects
  } catch (error) {
    console.error("Error getting vehicles by customer ID:", error);
    throw new Error("Database error while getting vehicles by customer ID");
  }
};

// Function to retrieve a specific vehicle  by customer ID and vehicle ID
const findVehicleById = async (customer_id, vehicle_id) => {
  try {
    const query = `
    SELECT *
    FROM customer_vehicle_info
    WHERE customer_id = ? AND vehicle_id = ?
  `;
    const [vehicle] = await db.query(query, [customer_id, vehicle_id]);
    console.log("form findVehicleById", vehicle);
    return vehicle;
  } catch (error) {
    console.error("Error finding vehicle", error);
    throw new Error("Error finding vehicle");
  }
};

/**
 * Updates an existing vehicle in the database.
 *
 * @param {object} vehicleDetails - The updated details of the vehicle.
 * @returns {Promise<void>}
 */
const updateVehicle = async (vehicleDetails) => {
  try {
    const query = `
    UPDATE customer_vehicle_info 
    SET 
      vehicle_model = ?, 
      vehicle_year = ?, 
      vehicle_make = ?, 
      vehicle_type = ?, 
      vehicle_mileage = ?, 
      vehicle_serial = ?, 
      vehicle_tag = ?, 
      vehicle_color = ?
    WHERE 
      customer_id = ? AND vehicle_id = ?;
  `;
    await db.query(query, [
      vehicleDetails.vehicle_model,
      vehicleDetails.vehicle_year,
      vehicleDetails.vehicle_make,
      vehicleDetails.vehicle_type,
      vehicleDetails.vehicle_mileage,
      vehicleDetails.vehicle_serial,
      vehicleDetails.vehicle_tag,
      vehicleDetails.vehicle_color,
      vehicleDetails.customer_id,
      vehicleDetails.vehicle_id,
    ]);
  } catch (error) {
    console.error("Error While updating vehicle details", error);
    throw new Error("Database error while updating vehicle details");
  }
};

// Function to delete a vehicle by vehicle_id
const deleteVehicle = async (customer_id, vehicle_id) => {
  try {
    const query = `
      DELETE FROM customer_vehicle_info
      WHERE customer_id =? AND vehicle_id =?;
  `;
    await db.query(query, [customer_id, vehicle_id]);
  } catch (error) {
    console.error("Error while deleting vehicle", error);
    throw new Error("Database error while deleting vehicle");
  }
};

module.exports = {
  checkCustomerExists,
  addVehicle,
  getVehiclesByCustomerId,
  findVehicleById,
  addVehicle,
  updateVehicle,
  deleteVehicle,
};
