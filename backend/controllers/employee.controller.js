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
// Export the CreateEmployee method
module.exports = {
  createEmployee,
};
