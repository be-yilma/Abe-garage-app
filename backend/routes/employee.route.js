// import express module
const express = require("express");
// import the router module
const router = express.Router();

// import the employee controller
const employeeController = require("../controllers/employee.controller");
// import middleware
const authMiddleware = require("../middlewares/auth.middleware");

// pass the employee request to the employee controller and call the employee function in it
router.post(
  "/api/employee",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.createEmployee
);

// a routte to handle the get all employess on get
router.get(
  "/api/employee",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.getEmployees
);

// Route to get employee by ID
router.get("/api/employees/:id", employeeController.getEmployeeById);

// exprot the router
module.exports = router;
