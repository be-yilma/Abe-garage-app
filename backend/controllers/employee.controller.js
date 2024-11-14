// import the employee service
const employeeService = require("../services/employee.service");
// create  the add employee controller function
async function createEmployee(req, res, next) {
  // check if the employee exists in the database
  const employeeExists = await employeeService.checkIfEmployeeExists(
    req.body.employee_email
  );
  // if employee exists, then send a response to the client
  if (employeeExists) {
    res.status(400).json({
      error: "This email address is already associated with another employee!",
    });
  } else {
    try {
      const employeeData = req.body;
      //   call the service to crete the employee
      const employee = await employeeService.createEmployee(employeeData);
      if (!employee) {
        res.status(400).json({
          error: "Something went wrong, please try again!",
        });
      } else {
        res.status(201).json({
          status: "Employee created successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Something went wrong, please try again!",
      });
    }
  }
}

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
    const employee = await employeeService.getEmployeeById(employeeId);
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

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
};
