// Import the dotenv package
require("dotenv").config();
// Import the jsonwebtoken package
const jwt = require("jsonwebtoken");
const employeeService = require("../services/employee.service");

// A function to verify the token received from the frontend server
const verifyToken = async (req, res, next) => {
  // Get the token from the header
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      status: "fail",
      message: "No token provided",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log("Token verification error: ", err.message);
      return res.status(401).send({
        status: "fail",
        message: "Invalid token",
      });
    }

    console.log("Decoded token: ", decoded);
    req.employee_email = decoded.employee_email;
    next();
  });
};

// A function to check if the user is an admin or not
const isAdmin = async (req, res, next) => {
  console.log("Employee email from token: ", req.employee_email);

  try {
    // Get the employee by email
    const employee_email = req.employee_email;
    const employee = await employeeService.getEmployeeByEmail(employee_email);

    if (!employee || employee.length === 0) {
      return res.status(404).send({
        status: "fail",
        message: "Employee not found",
      });
    }

    console.log("Employee retrieved: ", employee[0]);

    // Check if the employee has an admin role
    if (employee[0].company_role_id === 3) {
      next(); // Success
    } else {
      return res.status(403).send({
        status: "fail",
        error: "Not an Admin!",
      });
    }
  } catch (error) {
    console.log("Error in isAdmin middleware: ", error.message);
    return res.status(500).send({
      status: "fail",
      message: "An error occurred while checking admin privileges",
    });
  }
};

// Export the middleware functions
const authMiddleware = {
  verifyToken,
  isAdmin,
};

module.exports = authMiddleware;
