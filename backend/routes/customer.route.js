// import express module
const express = require("express");
// import the router module
const router = express.Router();

// import the customer controller
const customerController = require("../controllers/customer.controller");

// Route to add a new customer
router.post("/api/add-customer", customerController.addCustomer);

// GET all customers
router.get("/api/customers", customerController.getAllCustomers);

// Define the route for fetching a customer by ID
router.get("/api/customer/:id", customerController.getCustomerById);

// Define the PUT or PATCH route for updating a customer
router.put("/api/customer/:id", customerController.updateCustomer);

module.exports = router;
