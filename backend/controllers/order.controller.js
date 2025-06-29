const orderService = require("../services/order.service");
const { v4: uuidv4 } = require("uuid");
/**
 * Handles creating a new order.
 *
 * @param {object} req - HTTP request object.
 * @param {object} res - HTTP response object.
 */
const createOrder = async (req, res) => {
  try {
    const {
      employee_id,
      customer_id,
      vehicle_id,
      order_total_price,
      additional_request,
      estimated_completion_date,
      completion_date,
      order_services,
    } = req.body;

    // Validate required fields
    if (!employee_id || !customer_id || !vehicle_id || !order_services) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide all required fields",
      });
    }

    // Generate order_hash using uuid generated
    const order_hash = uuidv4(); // dhegayuehayetudrjys
    // Call the service to create the order
    const order = await orderService.createOrder(
      {
        employee_id,
        customer_id,
        vehicle_id,
        order_total_price: order_total_price || 0,
        additional_request,
        estimated_completion_date,
        completion_date,
        order_services,
      },
      order_hash
    );

    res.status(201).json({
      message: "Order created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in createOrder:", error.message);

    if (error.message.includes("Invalid")) {
      return res.status(400).json({
        error: "Bad Request",
        message: error.message,
      });
    } else {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "An unexpected error occurred while creating the order.",
      });
    }
  }
};

/**
 * Handles retrieving all orders.
 *
 * @param {object} req - HTTP request object.
 * @param {object} res - HTTP response object.
 */
const getAllOrders = async (req, res) => {
  try {
    // Fetch all orders using the service
    const orders = await orderService.getAllOrders();

    // Respond with the retrieved orders
    res.status(200).json(orders);
  } catch (error) {
    // Log the error and respond with a 500 status
    console.error("Error in getAllOrders:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred while retrieving orders.",
    });
  }
};

/**
 * Handles retrieving a specific order by its ID.
 *
 * @param {object} req - HTTP request object.
 * @param {object} res - HTTP response object.
 */
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate that an ID is provided
    if (!id) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Order ID is required",
      });
    }

    // Fetch the order details from the service
    const order = await orderService.getOrderById(id);

    if (!order) {
      return res.status(404).json({
        error: "Not Found",
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error in getOrderById:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * Handles updating an order.
 *
 * @param {object} req - HTTP request object.
 * @param {object} res - HTTP response object.
 */
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params; // Extract order ID from the URL
    const {
      additional_request,
      estimated_completion_date,
      completion_date,
      order_completed,
      order_services,
    } = req.body;

    // Validate required fields
    if (
      !id ||
      !additional_request ||
      !estimated_completion_date ||
      order_completed === undefined
    ) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide all required fields",
      });
    }

    // Check if the order exists
    const orderExists = await orderService.checkOrderExists(id);
    if (!orderExists) {
      return res.status(404).json({
        error: "Not Found",
        message: "Order not found",
      });
    }

    // Update the order
    await orderService.updateOrder(id, {
      additional_request,
      estimated_completion_date,
      completion_date,
      order_completed,
      order_services,
    });

    res.status(200).json({
      message: "Order updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in updateOrder:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred while updating the order.",
    });
  }
};

/**
 * Handles deleting an order.
 *
 * @param {object} req - HTTP request object.
 * @param {object} res - HTTP response object.
 */
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params; // Extract order ID from the URL

    // Check if the order exists
    const orderExists = await orderService.checkOrderExists(id);
    if (!orderExists) {
      return res.status(404).json({
        error: "Not Found",
        message: "Order not found",
      });
    }

    // Delete the order using the service
    await orderService.deleteOrder(id);

    res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteOrder:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
