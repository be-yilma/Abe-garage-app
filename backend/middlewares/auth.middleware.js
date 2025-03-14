// Import required packages
require("dotenv").config();
const jwt = require("jsonwebtoken");
const employeeService = require("../services/employee.service");

// Middleware to verify the token received from the frontend
const verifyToken = async (req, res, next) => {
  // Retrieve the token from the Authorization header
  const authHeader = req.headers["authorization"]; // Authorization : "Bearer token"
  if (!authHeader) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Token is missing",
    });
  }

  // Extract the token from the "Bearer <token>" format
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Invalid token format",
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

// middleware to check manger permissions
// Middleware to check if the user has admin privileges
const adminManager = async (req, res, next) => {
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
    if (
      employee[0].company_role_id === 2 ||
      employee[0].company_role_id === 3
    ) {
      // Assuming 2 is the manager role ID
      next(); // Employee is manager, proceed to the next handler
    } else {
      return res.status(403).json({
        status: "fail",
        message: "Not a Manager!",
      });
    }
  } catch (error) {
    console.error("Error in adminManager middleware: ", error.message);
    return res.status(500).json({
      status: "fail",
      message: "An error occurred while checking admin privileges",
    });
  }
};
const authMiddleware = {
  verifyToken,
  isAdmin,
  adminManager,
};

module.exports = authMiddleware;

// Export the middleware functions for use in routes
