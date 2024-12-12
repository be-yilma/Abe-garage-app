const db = require("../config/db.config");

/**
 * Inserts a new order and its associated data into the database.
 *
 * @param {object} orderDetails - The details of the order.
 * @param {string} order_hash - A unique hash for the order.
 * @returns {Promise<number>} - The ID of the created order.
 */
const createOrder = async (orderDetails, order_hash) => {
  const {
    employee_id,
    customer_id,
    vehicle_id,
    order_total_price,
    additional_request,
    estimated_completion_date,
    completion_date,
    order_services,
  } = orderDetails;

  try {
    // Validate employee_id
    const [employeeExists] = await db.query(
      `SELECT employee_id FROM employee WHERE employee_id = ? AND active_employee = 1`,
      [employee_id]
    );
    if (!employeeExists) {
      throw new Error("Invalid or inactive employee_id.");
    }

    // Validate customer_id
    const [customerExists] = await db.query(
      `SELECT customer_id FROM customer_identifier WHERE customer_id = ?`,
      [customer_id]
    );
    if (!customerExists) {
      throw new Error("Invalid customer_id Buzu.");
    }

    // Validate vehicle_id
    const [vehicleExists] = await db.query(
      `SELECT vehicle_id FROM customer_vehicle_info WHERE vehicle_id = ? AND customer_id = ?`,
      [vehicle_id, customer_id]
    );
    if (!vehicleExists) {
      throw new Error(
        "Invalid vehicle_id or vehicle does not belong to the customer."
      );
    }

    // Insert into the `orders` table
    const orderQuery = `
      INSERT INTO orders (
        employee_id,
        customer_id,
        vehicle_id,
        order_date,
        active_order,
        order_hash
      ) VALUES (?, ?, ?, CURRENT_TIMESTAMP, 1, ?);
    `;
    const orderResult = await db.query(orderQuery, [
      employee_id,
      customer_id,
      vehicle_id,
      order_hash,
    ]);
    const order_id = orderResult.insertId;

    // Insert into the `order_info` table
    const orderInfoQuery = `
      INSERT INTO order_info (
        order_id,
        order_total_price,
        estimated_completion_date,
        completion_date,
        additional_request
      ) VALUES (?, ?, ?, ?, ?);
    `;
    await db.query(orderInfoQuery, [
      order_id,
      order_total_price,
      estimated_completion_date || null,
      completion_date,
      additional_request,
    ]);

    // Insert into the `order_services` table
    const orderServicesQuery = `
      INSERT INTO order_services (order_id, service_id, service_completed)
      VALUES (?, ?, 0);
    `;
    for (const service_id of order_services) {
      await db.query(orderServicesQuery, [order_id, service_id]);
    }

    // Insert the default status into the `order_status` table
    const orderStatusQuery = `
      INSERT INTO order_status (
        order_id,
        order_status
      ) VALUES (?, ?);
    `;
    await db.query(orderStatusQuery, [order_id, 0]); // Assuming `0` represents the default status, like "Pending"

    return order_id;
  } catch (error) {
    console.error("Error in createOrder:", error.message);
    throw new Error(error.message || "Database error while creating the order");
  }
};

/**
 * Retrieves all orders from the database, including associated services.
 *
 * @returns {Promise<object[]>} - A list of all orders.
 * @throws {Error} - If there is a database error.
 */
const getAllOrders = async () => {
  try {
    // Query to retrieve orders along with their related information and services
    const ordersQuery = `
      SELECT 
        o.order_id,
        o.employee_id,
        o.customer_id,
        o.vehicle_id,
        oi.order_total_price,
        oi.estimated_completion_date,
        oi.completion_date,
        oi.additional_request,
        os.order_service_id,
        os.service_id,
        os.service_completed
      FROM orders o
      LEFT JOIN order_info oi ON o.order_id = oi.order_id
      LEFT JOIN order_services os ON o.order_id = os.order_id
    `;

    // Execute the query and retrieve the results
    const rows = await db.query(ordersQuery);

    // Use a map to group orders by `order_id`
    const ordersMap = new Map();

    rows.forEach((row) => {
      // If the order_id is not already in the map, create a new entry
      if (!ordersMap.has(row.order_id)) {
        ordersMap.set(row.order_id, {
          order_id: row.order_id,
          employee_id: row.employee_id,
          customer_id: row.customer_id,
          vehicle_id: row.vehicle_id,
          order_total_price: row.order_total_price,
          estimated_completion_date: row.estimated_completion_date,
          completion_date: row.completion_date,
          additional_request: row.additional_request,
          order_services: [], // Initialize an empty array for services
        });
      }

      // Add the service to the order's `order_services` array if it exists
      if (row.order_service_id) {
        ordersMap.get(row.order_id).order_services.push({
          order_service_id: row.order_service_id,
          service_id: row.service_id,
          service_completed: row.service_completed,
        });
      }
    });

    // Convert the map to an array of orders and return it
    return Array.from(ordersMap.values());
  } catch (error) {
    // Log the error and throw it for the controller to handle
    console.error("Error in getAllOrders:", error.message);
    throw new Error("Database error while retrieving orders");
  }
};

module.exports = { createOrder, getAllOrders };
