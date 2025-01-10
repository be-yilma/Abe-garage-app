// import the employee service
const employeeService = require("../services/employee.service");
// import the bcrypt
const bcrypt = require("bcrypt");

/**
 * Handles adding a new employee.
 *
 * @param {object} req - HTTP request object.
 * @param {object} res - HTTP response object.
 */
const addEmployee = async (req, res) => {
  try {
    const {
      employee_email,
      employee_password,
      active_employee = 1,
      employee_first_name,
      employee_last_name,
      employee_phone,
      company_role_id,
    } = req.body;

    // Validate required fields
    if (
      !employee_email ||
      !employee_password ||
      !employee_first_name ||
      !employee_last_name ||
      !employee_phone ||
      !company_role_id
    ) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide all required fields",
      });
    }

    // Check if the employee already exists
    const employeeExists = await employeeService.checkIfEmployeeExists(
      employee_email
    );
    if (employeeExists) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Employee with this email already exists",
      });
    }

    // Call the service to create the employee
    await employeeService.createEmployee({
      employee_email,
      employee_password,
      active_employee,
      employee_first_name,
      employee_last_name,
      employee_phone,
      company_role_id,
    });

    res.status(201).json({
      message: "Employee created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in addEmployee:", error.message);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

// Controller function to retrieve all employees
const getEmployees = async (req, res) => {
  try {
    // Attempt to fetch all employees from the employee service
    const employees = await employeeService.getAllEmployees();

    // Respond with a 404 status if no employees were found
    if (!employees || employees.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No employees found",
      });
    }

    // Successfully retrieved employees; send response with data
    res.status(200).json({
      status: "success",
      message: "Employees retrieved successfully",
      data: employees,
    });
  } catch (error) {
    // Log detailed error information for debugging purposes
    console.error("Error in getEmployees controller:", error);

    // Send a 500 status response if a server error occurs
    res.status(500).json({
      status: "fail",
      message: "Failed to retrieve employees. Please try again later.",
    });
  }
};

// Controller to get an employee by ID
const getEmployeeById = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const employee = await employeeService.getEmployeeById(employeeId); // data row[0] // null
    console.log("form employee found", employee);
    if (!employee) {
      return res.status(404).json({
        error: "Not Found",
        message: "Employee not found",
      });
    }
    return res.status(200).json(employee);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

const updateEmployee = async (req, res) => {
  // extract employee id from the url params
  const employee_id = req.params.id;
  const {
    employee_first_name,
    employee_last_name,
    employee_phone,
    employee_email,
    employee_password,
  } = req.body;

  // vaildate the employee details
  if (
    !employee_first_name ||
    !employee_last_name ||
    !employee_phone ||
    !employee_email ||
    !employee_password //  123456 =  skfhhueyg7485943779buvbxj
  ) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Please provide all required fields",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(employee_password, 10);

    const updated = await employeeService.updateEmployee(
      employee_id,
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_email,
      hashedPassword
    );

    console.log("employee updated", updated); // update= true

    if (updated.error) {
      return res.status(updated.status).json(updated);
    }

    // Return seccess response
    res.status(200).json({
      message: "Employee updated successfully",
      success: "true",
    });
  } catch (error) {
    console.error("Error in updateEmployee controller:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

// function to delete employee
const deleteEmployee = async (req, res) => {
  const employeeId = req.params.id; // Extract the employee ID from the URL

  try {
    // Step 1: Delete the employee
    const deleteResult = await employeeService.deleteEmployeeById(employeeId);

    if (deleteResult.error) {
      return res.status(deleteResult.status).json(deleteResult);
    }

    // Step 3: Respond with success
    return res.status(200).json({
      message: "Employee deleted successfully",
      success: "true",
    });
  } catch (error) {
    console.error("Error in deleteEmployee controller:", error.message);
    return res.status(500).json({
      error: "serever error  ",
      message: "An unexpected error occurred.",
    });
  }
};

module.exports = {
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
