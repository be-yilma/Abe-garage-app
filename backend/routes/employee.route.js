// import express module
const express = require("express");
// import the router module
const router = express.Router();

// import the employee controller
const employeeController = require("../controllers/employee.controller");

// pass the employee request to the employee controller and call the employee function in it
router.post("/api/employee", employeeController.createEmployee);

// exprot the router
module.exports = router;
