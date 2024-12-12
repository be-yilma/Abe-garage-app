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

module.exports = { createOrder };
