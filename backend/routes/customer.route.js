// import express module
const express = require("express");
// import the router module
const router = express.Router();

// import the customer controller
const customerController = require("../controllers/customer.controller");
const { verifyToken, adminManager } = require("../middlewares/auth.middleware");

// Route to add a new customer
router.post(
  "/api/add-customer",
  verifyToken,
  adminManager,
  customerController.addCustomer
);

// GET all customers
router.get(
  "/api/customers",
  verifyToken,
  adminManager,
  customerController.getAllCustomers
);

// Define the route for fetching a customer by ID
router.get(
  "/api/customer/:id",
  verifyToken,
  adminManager,
  customerController.getCustomerById
);

// Define the PUT or PATCH route for updating a customer
router.put(
  "/api/customer/:id",
  verifyToken,
  adminManager,
  customerController.updateCustomer
);

module.exports = router;
