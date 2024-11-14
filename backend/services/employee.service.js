// import the db connection file
const connection = require("../config/db.config");
// import the bcrypt module
const bcrypt = require("bcrypt");
// a function to check if the employee exists in the database
async function checkIfEmployeeExists(email) {
  const query = "SELECT * FROM employee WHERE employee_email = ?";
  // execute the query
  const rows = await connection.query(query, [email]);
  // check if the employee exists in the database
  if (rows.length > 0) {
    return true;
  }
  return false;
}

// a function to create a new employee
async function createEmployee(employee) {
  let createdEmployee = {};
  try {
    // generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(employee.employee_password, salt);
    console.log(hashedPassword);

    // insert the email into the employee table
    const query =
      "INSERT INTO employee (employee_email, active_employee) VALUES (?,?)";
    const rows = await connection.query(query, [
      employee.employee_email,
      employee.active_employee,
    ]);
    // console.log(rows);
    if (rows.affectedRows !== 1) {
      return false;
    }
    // get the employee id from the inserted rows
    const employee_id = rows.insertId;
    // insert the remaining data into the employee_info table
    const query2 =
      "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?,?,?,?)";
    const rows2 = await connection.query(query2, [
      employee_id,
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
    ]);
    // insert employee_pass table
    const query3 =
      "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?,?)";
    const rows3 = await connection.query(query3, [employee_id, hashedPassword]);
    // insert employee_role table
    const query4 =
      "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?,?)";
    const rows4 = await connection.query(query4, [
      employee_id,
      employee.company_role_id,
    ]);
    // construct the employee object to return
    createdEmployee = {
      employee_id: employee_id,
    };
  } catch (error) {
    console.log(error);
  }
  // return the created employee
  return createdEmployee;
}
// a function to get employee by email // a function to get employee by email
async function getEmployeeByEmail(employee_email) {
  const query = `
    SELECT * 
    FROM employee 
    INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id 
    INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id 
    INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id 
    WHERE employee.employee_email = ?
  `;

  const rows = await connection.query(query, [employee_email]);
  return rows;
  // try {
  //   const rows = await connection.query(query, [employee_email.trim()]);
  //   return rows;
  // } catch (error) {
  //   console.error("Error getting employee by email:", error);
  //   throw error;
  // }
}
// a function to get all employees// Service function to retrieve all employees with all relevant details
const getAllEmployees = async () => {
  try {
    const query = `
    SELECT * 
    FROM employee 
    INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id 
    INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id 
    INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id 
    ORDER BY employee.employee_id DESC 
    LIMIT 10
  `;
    // Execute the query
    const rows = await connection.query(query);
    console.log("Fetched employee", rows);
    return rows; // Return the result set
  } catch (error) {
    console.error("Error in getAllEmployees service:", error.message);
    throw new Error("Database query failed"); // Throw error for the controller to handle
  }
};
// export the functions for use in the controller
module.exports = {
  checkIfEmployeeExists,
  createEmployee,
  getEmployeeByEmail,
  getAllEmployees,
};
