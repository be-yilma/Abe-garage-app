// Import required packages
require("dotenv").config();
const jwt = require("jsonwebtoken");
const employeeService = require("../services/employee.service");

// Middleware to verify the token received from the frontend
const verifyToken = async (req, res, next) => {
  // Retrieve token from the request headers
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).json({
      status: "fail",
      message: "No token provided",
    });
  }

  try {
    // Verify the token using the JWT secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded token: ", decoded);
    req.employee_email = decoded.employee_email;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification error: ", error.message);
    return res.status(401).json({
      status: "fail",
      message: "Invalid or expired token",
    });
  }
};

// Middleware to check if the user has admin privileges
const isAdmin = async (req, res, next) => {
  console.log("Employee email from token: ", req.employee_email);

  try {
    // Retrieve the employee by email from the database
    const employee = await employeeService.getEmployeeByEmail(
      req.employee_email
    );

    if (!employee || employee.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Employee not found",
      });
    }

    console.log("Employee retrieved: ", employee[0]);

    // Check if the employee has an admin role
    if (employee[0].company_role_id === 3) {
      // Assuming 3 is the admin role ID
      next(); // Employee is admin, proceed to the next handler
    } else {
      return res.status(403).json({
        status: "fail",
        message: "Not an Admin!",
      });
    }
  } catch (error) {
    console.error("Error in isAdmin middleware: ", error.message);
    return res.status(500).json({
      status: "fail",
      message: "An error occurred while checking admin privileges",
    });
  }
};

// Export the middleware functions for use in routes
const authMiddleware = {
  verifyToken,
  isAdmin,
};

module.exports = authMiddleware;
