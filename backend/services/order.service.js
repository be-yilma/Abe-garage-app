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
/**
 * Retrieves a specific order and its associated services by its ID.
 *
 * @param {number} id - The ID of the order to retrieve.
 * @returns {Promise<object|null>} - The order details, or null if not found.
 */
const getOrderById = async (id) => {
  try {
    // Query to fetch the order and its associated services
    const orderQuery = `
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
      WHERE o.order_id = ?;
    `;

    const rows = await db.query(orderQuery, [id]);

    if (rows.length === 0) {
      return null; // Order not found
    }

    // Group the order and its services
    const order = {
      order_id: rows[0].order_id,
      employee_id: rows[0].employee_id,
      customer_id: rows[0].customer_id,
      vehicle_id: rows[0].vehicle_id,
      order_total_price: rows[0].order_total_price,
      estimated_completion_date: rows[0].estimated_completion_date,
      completion_date: rows[0].completion_date,
      additional_request: rows[0].additional_request,
      order_services: [],
    };

    // Add services to the order
    rows.forEach((row) => {
      if (row.order_service_id) {
        order.order_services.push({
          order_service_id: row.order_service_id,
          service_id: row.service_id,
          service_completed: row.service_completed,
        });
      }
    });

    return order;
  } catch (error) {
    console.error("Error in getOrderById:", error.message);
    throw new Error("Database error while retrieving the order");
  }
};
/**
 * Checks if an order exists in the database.
 *
 * @param {number} order_id - The ID of the order to check.
 * @returns {Promise<boolean>} - True if the order exists, otherwise false.
 */
const checkOrderExists = async (order_id) => {
  try {
    const orderResult = await db.query(
      `SELECT order_id FROM orders WHERE order_id = ?`,
      [order_id]
    );
    return orderResult.length > 0; // Return true if the order exists
  } catch (error) {
    console.error("Error in checkOrderExists:", error.message);
    throw new Error("Database error while checking order existence");
  }
};

/**
 * Updates an order and its associated services in the database.
 *
 * @param {number} order_id - The ID of the order to update.
 * @param {object} orderDetails - The updated details of the order.
 * @returns {Promise<void>} - Resolves if the update was successful.
 */
const updateOrder = async (order_id, orderDetails) => {
  const {
    additional_request,
    estimated_completion_date,
    completion_date,
    order_completed,
    order_services,
  } = orderDetails;

  try {
    // Update the `order_info` table
    const updateOrderInfoQuery = `
      UPDATE order_info
      SET
        additional_request = ?,
        estimated_completion_date = ?,
        completion_date = ?,
        additional_requests_completed = ?
      WHERE order_id = ?;
    `;
    await db.query(updateOrderInfoQuery, [
      additional_request,
      estimated_completion_date,
      completion_date || null,
      order_completed,
      order_id,
    ]);

    // Update the `order_services` table
    if (Array.isArray(order_services)) {
      const deleteServicesQuery = `DELETE FROM order_services WHERE order_id = ?`;
      await db.query(deleteServicesQuery, [order_id]);

      const insertServicesQuery = `
        INSERT INTO order_services (order_id, service_id, service_completed)
        VALUES (?, ?, ?);
      `;
      for (const service of order_services) {
        const { service_id, service_completed } = service;
        await db.query(insertServicesQuery, [
          order_id,
          service_id,
          service_completed || 0,
        ]);
      }
    }
  } catch (error) {
    console.error("Error in updateOrder:", error.message);
    throw new Error("Database error while updating the order");
  }
};
/**
 * Deletes an order and its associated records from the database.
 *
 * @param {number} order_id - The ID of the order to delete.
 * @returns {Promise<void>} - Resolves if the delete was successful.
 */
const deleteOrder = async (order_id) => {
  try {
    // Delete associated records from `order_services` and `order_info`
    const deleteServicesQuery = `DELETE FROM order_services WHERE order_id = ?`;
    const deleteInfoQuery = `DELETE FROM order_info WHERE order_id = ?`;

    await db.query(deleteServicesQuery, [order_id]);
    await db.query(deleteInfoQuery, [order_id]);

    // Delete the order from `orders`
    const deleteOrderQuery = `DELETE FROM orders WHERE order_id = ?`;
    await db.query(deleteOrderQuery, [order_id]);
  } catch (error) {
    console.error("Error in deleteOrder:", error.message);
    throw new Error("Database error while deleting the order");
  }
};
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  checkOrderExists,
  deleteOrder,
};
