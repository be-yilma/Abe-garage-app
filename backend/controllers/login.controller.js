// import the login service
const loginService = require("../services/login.service");
// import the jsonwebtoken moudle
const jwt = require("jsonwebtoken");
// Import the secrete key from the environment variable
const jwtSecret = process.env.JWT_SECRET_KEY;
// handle the login
async function logIn(req, res, next) {
  try {
    // console.log(req.body);
    const employeeData = req.body;
    console.log(employeeData);

    // call the login method from the login service
    const employee = await loginService.logIn(employeeData);
    // console.log(employee);
    // if the employee is not found
    if (employee.status === "failed") {
      return res.status(403).json({
        status: employee.status,
        message: employee.message,
      });
    }
    // if successful,send a response with the employee status
    // prepare the payload
    const payload = {
      employee_email: employee.data.employee_email,
      employee_first_name: employee.data.employee_first_name,
    };
    // generate the token
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "30d" });
    console.log("Generated token", token);
    const sendBack = {
      employee_token: token,
    };
    // send the response with the token

    return res.status(200).json({
      status: "success",
      message: "Employee logged in successfully",
      data: sendBack,
    });
  } catch (error) {
    return res.status(error.status).json({
      status: "failure",
      message: "Something went wrong! Please try again later.",
    });
  }
}
// export the functions

module.exports = {
  logIn,
};
