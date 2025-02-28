const db = require("../config/db.config"); // Database connection

/**
 * Check if a customer exists by email.
 *
 * @param {string} customerEmail - The email of the customer to check.
 * @returns {Promise<boolean>} - Returns true if the customer exists, otherwise false.
 */
async function checkCustomerExists(customerEmail) {
  if (!customerEmail) {
    throw new Error("Customer email is required");
  }

  try {
    const rows = await db.query(
      "SELECT customer_id FROM customer_identifier WHERE customer_email = ?",
      [customerEmail]
    );
    // log the rows
    console.log("Rows:", rows); // to check for the existence of customer
    // If the rows length is greater than 0, the customer exists
    // If the rows length is 0, the customer does not exist
    return rows.length > 0;
  } catch (error) {
    console.error("Error in checkCustomerExists:", error);
    throw new Error("Database error while checking customer existence");
  }
}

/**
 * Create a new customer in the database.
 *
 * @param {object} customerData - The customer details from the request body.
 * @param {string} customerHash - The unique hash for the customer.
 */
async function createCustomer(customerData, customerHash) {
  try {
    // Insert into customer_identifier
    const result = await db.query(
      `INSERT INTO customer_identifier 
      (customer_email, customer_phone_number, customer_hash) 
      VALUES (?, ?, ?)`,
      [
        customerData.customer_email,
        customerData.customer_phone_number,
        customerHash,
      ]
    );

    // console.log(result); // to check for inserted id in customer
    const customer_id = result.insertId; // Get the generated customer_id

    // Insert into customer_info
    await db.query(
      `INSERT INTO customer_info 
      (customer_id, customer_first_name, customer_last_name, active_customer_status) 
      VALUES (?, ?, ?, ?)`,
      [
        customer_id,
        customerData.customer_first_name,
        customerData.customer_last_name,
        customerData.active_customer_status || 1,
      ]
    );
    return createCustomer;
  } catch (error) {
    console.error("Error in createCustomer:", error);
    throw new Error("Database error while creating customer");
  }
}

/**
 * Fetch all customers from the database.
 *
 * @returns {Promise<Array>} - Returns an array of customer records.
 */
async function getAllCustomers() {
  try {
    const rows = await db.query(`
      SELECT 
        ci.customer_id,
        ci.customer_email,
        ci.customer_phone_number,
        ci.customer_hash,
        ci.customer_added_date,
        cinfo.customer_first_name,
        cinfo.customer_last_name,
        cinfo.active_customer_status
      FROM 
        customer_identifier ci
      JOIN 
        customer_info cinfo
      ON 
        ci.customer_id = cinfo.customer_id
  
    `);

    return rows;
  } catch (error) {
    console.error("Error in getAllCustomers:", error);
    throw new Error("Database error while fetching customers");
  }
}

/**
 * Retrieve customer details by ID.
 *
 * @param {number} id - The ID of the customer to retrieve.
 * @returns {object|null} - The customer object if found, otherwise null.
 * @throws {Error} - If there is an issue with the database query.
 */
const getCustomerById = async (id) => {
  try {
    // Query the database to find the customer by ID
    const query =
      "SELECT * FROM customer_identifier LEFT JOIN  customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_identifier.customer_id=?";
    const result = await db.query(query, [id]);
    console.log("from get cusomer by id ", result);
    // Return the customer object if found; otherwise, return null
    if (result.length === 0) {
      return null; // customer no found
    }
    return result[0]; // customer found with details
  } catch (error) {
    console.error("Error in customerService.getCustomerById:", error);
    throw error; // Allow the controller to handle the error
  }
};

/**
 * Update a customer's details in the database.
 *
 * @param {number} id - The ID of the customer to update.
 * @param {object} updates - The updated customer details.
 * @returns {Promise<void>}
 */
const updateCustomer = async (id, updates) => {
  try {
    // Update customer_info table
    const updateCustomerInfoQuery = `
      UPDATE customer_info
      SET 
        customer_first_name = ?,
        customer_last_name = ?,
        active_customer_status = ?
      WHERE 
        customer_id = ?;
    `;

    const updateCustomerIdentifierQuery = `
      UPDATE customer_identifier
      SET 
        customer_phone_number = ?
      WHERE 
        customer_id = ?;
    `;

    // Execute the first update
    await db.query(updateCustomerInfoQuery, [
      updates.customer_first_name,
      updates.customer_last_name,
      updates.active_customer_status,
      id,
    ]);

    // Execute the second update
    await db.query(updateCustomerIdentifierQuery, [
      updates.customer_phone_number,
      id,
    ]);
  } catch (error) {
    console.error("Error in customerService.updateCustomer:", error);
    throw error;
  }
};

module.exports = {
  checkCustomerExists,
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
};
