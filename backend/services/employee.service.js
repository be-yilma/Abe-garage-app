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

/**
 * Creates a new employee in the database.
 *
 * @param {object} employee - The details of the employee to create.
 * @returns {Promise<void>} - Resolves if the employee is created successfully.
 */
const createEmployee = async (employee) => {
  try {
    // Hash the employee's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(employee.employee_password, salt);

    // Insert into `employee` table
    const query1 = `
      INSERT INTO employee (employee_email, active_employee)
      VALUES (?, ?);
    `;
    const rows1 = await connection.query(query1, [
      employee.employee_email,
      employee.active_employee,
    ]);

    if (rows1.affectedRows !== 1) {
      throw new Error("Failed to insert employee into the `employee` table.");
    }

    const employee_id = rows1.insertId;

    // Insert into `employee_info` table
    const query2 = `
      INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone)
      VALUES (?, ?, ?, ?);
    `;
    await connection.query(query2, [
      employee_id,
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
    ]);

    // Insert into `employee_pass` table
    const query3 = `
      INSERT INTO employee_pass (employee_id, employee_password_hashed)
      VALUES (?, ?);
    `;
    await connection.query(query3, [employee_id, hashedPassword]);

    // Insert into `employee_role` table
    const query4 = `
      INSERT INTO employee_role (employee_id, company_role_id)
      VALUES (?, ?);
    `;
    await connection.query(query4, [employee_id, employee.company_role_id]);

    console.log("Employee created successfully with ID:", employee_id);
  } catch (error) {
    console.error("Error in createEmployee:", error.message);
    throw error; // Re-throw the error for the controller to handle
  }
};

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

// Service to get employee by ID
const getEmployeeById = async (employeeId) => {
  try {
    const query = `
  SELECT 
    employee.employee_id,
    employee.employee_email,
    employee.active_employee,
    employee.added_date,
    employee_info.employee_first_name,
    employee_info.employee_last_name,
    employee_info.employee_phone
  FROM employee
   JOIN employee_info ON employee.employee_id = employee_info.employee_id
  WHERE employee.employee_id = ?
`;

    // Execute the query with the employeeId parameter
    const rows = await connection.query(query, [employeeId]);

    // Return the employee record or null if not found
    if (rows.length === 0) {
      return null;
    } else {
      // return the employee record if it exists
      return rows[0];
    }
  } catch (error) {
    console.log("Error in getEmployeeById service:", error.message);
    throw new Error("Database query failed");
  }
};

// Function to update the employee details
const updateEmployee = async (
  employee_id,
  employee_first_name,
  employee_last_name,
  employee_phone,
  employee_email,
  hashedPassword
) => {
  try {
    // console.log(employee_id, employee_first_name);
    // Check if the employee exists in the database
    const [rows] = await connection.query(
      "SELECT * FROM employee WHERE employee_id = ?",
      [employee_id]
    );

    if (rows.length === 0) {
      return {
        error: "Not Found",
        message: "Employee not found",
        status: 404,
      };
    }

    // Update employee details in the database
    const employeeQuery = `
      UPDATE employee SET employee_email = ?, active_employee = 1, added_date = CURRENT_TIMESTAMP
      WHERE employee_id = ?
    `;
    await connection.query(employeeQuery, [employee_email, employee_id]);

    // Update employee_info table
    const employeeInfoQuery = `
      UPDATE employee_info
      SET employee_first_name = ?, employee_last_name = ?, employee_phone = ?
      WHERE employee_id = ?
    `;
    await connection.query(employeeInfoQuery, [
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_id,
    ]);

    // Update employee_pass table
    const employeePassQuery = `
      UPDATE employee_pass
      SET employee_password_hashed = ?
      WHERE employee_id = ?
    `;
    await connection.query(employeePassQuery, [hashedPassword, employee_id]);

    return {
      success: true,
    }; // Successfully updated
  } catch (error) {
    console.error("Error in updateEmployee service:", error.message);
    return {
      error: "Internal Server Error",
      message: "Failed to update employee details",
      status: 500,
    };
  }
};

// function to delete employee
const deleteEmployeeById = async (employeeId) => {
  try {
    // Check if the employee exists
    const rows = await connection.query(
      `SELECT * FROM employee WHERE employee_id = ?`,
      [employeeId]
    );
    if (rows.length === 0) {
      return { error: true, message: "Employee not found", status: 404 };
    }

    // Delete from related tables
    await connection.query(`DELETE FROM employee_pass WHERE employee_id = ?`, [
      employeeId,
    ]);
    await connection.query(`DELETE FROM employee_role WHERE employee_id = ?`, [
      employeeId,
    ]);
    await connection.query(`DELETE FROM employee_info WHERE employee_id = ?`, [
      employeeId,
    ]);

    // Delete from employee table
    const employeeResult = await connection.query(
      `DELETE FROM employee WHERE employee_id = ?`,
      [employeeId]
    );

    console.log("delete from employee table", employeeResult);
    // Check if the employee record was found and deleted
    if (employeeResult.affectedRows === 0) {
      return {
        error: true,
        message: "Employee not found",
        status: 404,
      };
    }

    return {
      success: true,
      message: `Deleted employee ${employeeId} successfully`,
    };
  } catch (error) {
    console.error("Error in deleteEmployeeById service:", error);
    return {
      error: "Internal Server Error",
      message: "Failed to delete employee",
      status: 500,
    };
  }
};

// export the functions for use in the controller
module.exports = {
  checkIfEmployeeExists,
  createEmployee,
  getEmployeeByEmail,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployeeById,
};
