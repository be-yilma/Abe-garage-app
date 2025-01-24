// import express module
const express = require("express");
// import the router module
const router = express.Router();

// import the employee controller
const employeeController = require("../controllers/employee.controller");
// import middleware
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

/**
 * @route POST /api/employee
 * @description Adds a new employee.
 * @access Private
 */
router.post(
  "/api/employee",
  verifyToken,
  isAdmin,
  employeeController.addEmployee
);

// a routte to handle the get all employess on get
router.get(
  "/api/employee",
  verifyToken,
  isAdmin,
  employeeController.getEmployees
);

// route to delete employee by id
router.delete(
  "/api/employee/:id",
  verifyToken,
  isAdmin,
  employeeController.deleteEmployee
);

// Route to get employee by ID
router.get(
  "/api/employees/:id",
  verifyToken,
  isAdmin,
  employeeController.getEmployeeById
);

//  Route to update an employee
router.put(
  "/api/employee/:id",
  verifyToken,
  isAdmin,
  employeeController.updateEmployee
);
// exprot the router
module.exports = router;
