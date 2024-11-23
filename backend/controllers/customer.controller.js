const customerService = require("../services/customer.service");
const { v4: uuidv4 } = require("uuid");

const addCustomer = async (req, res) => {
  try {
    // Validate required fields
    if (
      !req.body.customer_first_name ||
      !req.body.customer_last_name ||
      !req.body.customer_email ||
      !req.body.customer_phone_number ||
      !req.body.active_customer_status ||
      !req.body.Customer_added_date
    ) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide all required fields",
      });
    }

    // Check if customer already exists
    const customerExists = await customerService.checkCustomerExists(
      req.body.customer_email
    );
    if (customerExists) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Customer with this email already exists.",
      });
    }

    // Generate customer hash using UUID
    const customer_hash = uuidv4();

    // Create new customer using the service
    await customerService.createCustomer(req.body, customer_hash);

    res.status(201).json({
      message: "Customer created successfully",
      success: "true",
    });
  } catch (error) {
    console.error("Error in addCustomer:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

// export customer conroller
module.exports = { addCustomer };
