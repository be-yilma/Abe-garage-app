const customerService = require("../services/customer.service");
const { v4: uuidv4 } = require("uuid");

const addCustomer = async (req, res) => {
  try {
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

const getAllCustomers = async (req, res) => {
  try {
    // Fetch customers from the service
    const customers = await customerService.getAllCustomers();

    res.status(200).json({
      status: "success",
      message: "Customers retrieved successfully",
      data: customers,
    });
  } catch (error) {
    console.error("Error in getAllCustomers:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

const getCustomerById = async (req, res) => {
  const { id } = req.params; // Extract customer ID from path parameters

  // Validate if `id` is provided and numeric
  if (!id || isNaN(id)) {
    return res.status(400).json({
      error: "Bad Request",
      message: "A valid customer ID is required.",
    });
  }

  try {
    // Fetch customer details from the service
    const customer = await customerService.getCustomerById(id);
    if (customer) {
      // If customer exists, send success message with customer details
      return res.status(200).json({
        status: "success",
        message: "Customer fetched successfully",
        data: customer,
      });
    } else {
      // If customer does not exist, return a 404 response
      return res.status(404).json({
        error: "Not Found",
        message: "Customer not found",
      });
    }
  } catch (error) {
    console.error("Error in getCustomerById:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * Update an existing customer's details.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {void}
 */
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params; // Extract customer ID from the URL
    const {
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status,
    } = req.body;

    // Validate that all required fields are provided
    if (
      !customer_first_name ||
      !customer_last_name ||
      !customer_phone_number ||
      active_customer_status === undefined
    ) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide all required fields",
      });
    }

    // Check if the customer exists
    const customerExists = await customerService.getCustomerById(id);
    if (!customerExists) {
      return res.status(404).json({
        error: "Not Found",
        message: "Customer not found",
      });
    }

    // Update the customer in the database
    await customerService.updateCustomer(id, {
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status,
    });

    res.status(200).json({
      message: "Customer updated successfully",
      success: "true",
    });
  } catch (error) {
    console.error("Error in updateCustomer:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

// export customer conroller
module.exports = {
  addCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
};
