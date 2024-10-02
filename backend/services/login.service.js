// import the query function from the db.config file
const connection = require("../config/db.config");
// import the employee service to get the employee by email

const employeeService = require("./employee.service");

// import the bcrypt module to compare the password
const bcrypt = require("bcrypt");

// handle the employee login
async function logIn(employeeData) {
  try {
    let returnData = {}; // object to be retured
    const employee = await employeeService.getEmployeeByEmail(
      employeeData.employee_email
    );
    console.log(employee);
    // check if the employee exists
    if (employee.length === 0) {
      returnData = {
        status: "failed",
        message: "Employee does not exist",
      };
      return returnData;
    }
    // Compare the password
    const isMatch = await bcrypt.compare(
      employeeData.employee_password,
      employee[0].employee_password_hashed
    );
    // check if the password is matches
    if (!isMatch) {
      returnData = {
        status: "failed",
        message: "Incorrect password",
      };
      return returnData;
    }
    // if the password matches, then return the employee data
    returnData = {
      status: "success",
      data: employee[0],
    };
    return returnData;
  } catch (error) {
    console.error("error in login service:", error);
    return {
      status: "failed",
      message: "Something went wrong, please try again!",
    };
  }
}

// Export the function

module.exports = {
  logIn,
};
