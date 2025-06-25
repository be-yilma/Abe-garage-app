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
    SELECT customer_id FROM  customer_info 
    WHERE customer_id = ?;
  `;
    const [customer] = await db.query(query, [customer_id]);
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

// function to retrieve all vehicles
const getAllVehicles = async () => {
  try {
    const query = `
        SELECT * FROM customer_vehicle_info
        `;
    const vehicles = await db.query(query);
    return vehicles; // return an array of vehicles objects
  } catch (error) {
    console.error("Error getting vehicles:", error);
    throw new Error("Database error while getting vehicles");
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

// Functions to retrieve a specific vehicle
const getVehicleById = async (vehicle_id) => {
  try {
    const query = `
    SELECT * FROM customer_vehicle_info WHERE vehicle_id =?;
    `;

    const [vehicle] = await db.query(query, [vehicle_id]);
    return vehicle || null; // return vehicle if found , otherwise null
  } catch (error) {
    console.error("Error retrieveing vehicle: ", error);
    throw new Error("Internal server Error");
  }
};

// Function to check if a vehcile is exist
const checkVehicleExists = async (vehicle_id) => {
  try {
    const query = `
    SELECT vehicle_id
    FROM customer_vehicle_info
    WHERE  vehicle_id = ?
  `;
    const [vehicle] = await db.query(query, [vehicle_id]);
    return !!vehicle;
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
const updateVehicle = async (vehicle_id, vehicleDetails) => {
  try {
    const query = `UPDATE customer_vehicle_info 
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
      vehicle_id = ?;
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
      vehicle_id,
    ]);
  } catch (error) {
    console.error("Error While updating vehicle details", error);
    throw new Error("Database error while updating vehicle details");
  }
};

// Function to delete a vehicle by vehicle_id
const deleteVehicle = async (vehicle_id) => {
  try {
    const query = `DELETE FROM customer_vehicle_info
      WHERE vehicle_id = ?;
  `;
    await db.query(query, [vehicle_id]);
  } catch (error) {
    console.error("Error while deleting vehicle", error);
    throw new Error("Database error while deleting vehicle");
  }
};

module.exports = {
  checkCustomerExists,
  addVehicle,
  getVehiclesByCustomerId,
  checkVehicleExists,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
