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
      (customer_email, customer_phone_number, customer_hash, customer_added_date) 
      VALUES (?, ?, ?, ?)`,
      [
        customerData.customer_email,
        customerData.customer_phone_number,
        customerHash,
        customerData.Customer_added_date,
      ]
    );

    console.log(result); // to check for inserted id in customer
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
        customerData.active_customer_status,
      ]
    );
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
      LIMIT 10
    `);

    return rows;
  } catch (error) {
    console.error("Error in getAllCustomers:", error);
    throw new Error("Database error while fetching customers");
  }
}

module.exports = {
  checkCustomerExists,
  createCustomer,
  getAllCustomers,
};
