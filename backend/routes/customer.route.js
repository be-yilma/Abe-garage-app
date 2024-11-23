// import express module
const express = require("express");
// import the router module
const router = express.Router();

// import the customer controller
const customerController = require("../controllers/customer.controller");

// Route to add a new customer
router.post("/api/add-customer", customerController.addCustomer);

module.exports = router;
