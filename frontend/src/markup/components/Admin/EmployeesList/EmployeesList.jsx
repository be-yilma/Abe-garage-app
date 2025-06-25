import React, { useEffect, useState } from "react";
import { Table, Pagination, Alert } from "react-bootstrap";
import { format } from "date-fns";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../../../../context/AuthContext";
import employeeService from "../../../../services/employee.service";
import { useNavigate } from "react-router-dom";

const EmployeesList = () => {
  // States to manage data and UI
  const [employees, setEmployees] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  // state to success message
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success"); // 'success' or 'danger'

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of employees per page
  const navigate = useNavigate();

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await employeeService.getAllEmployees(token);
        if (!res.ok) {
          setApiError(true);
          if (res.status === 401) {
            setApiErrorMessage("Unauthorized. Please log in again.");
          } else if (res.status === 403) {
            setApiErrorMessage(
              "Forbidden. You are not authorized to access this resource."
            );
          } else {
            setApiErrorMessage(
              "An error occurred while fetching employees. Please try again."
            );
          }
          return;
        }
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          setEmployees(data.data);
        }
      } catch (error) {
        console.error("Error fetching employees: ", error);
        setApiError(true);
        setApiErrorMessage("Failed to fetch employees. Please try again.");
      }
    };
    fetchData();
  }, [token]);

  // handle edit request
  const handleEditClick = (employeeId) => {
    // Navigate to edit employee page with employee id
    navigate(`/admin/employees/edit/${employeeId}`);
  };

  // handle delete request for employee
  const handleDeleteEmployee = async (employeeId) => {
    try {
      const res = await employeeService.deleteEmployee(employeeId, token);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          // Refresh the employees list after deletion
          const updatedEmployees = employees.filter(
            (employee) => employee.employee_id !== employeeId
          );
          setEmployees(updatedEmployees);

          // Show success alert
          setAlertMessage("Employee deleted successfully!");
          setAlertVariant("success");
          setShowAlert(true);

          setTimeout(() => setShowAlert(false), 1000); // Hide alert after 1 seconds
        } else {
          // Show error alert
          setAlertMessage("Failed to delete employee. Please try again.");
          setAlertVariant("danger");
          setShowAlert(true);

          setTimeout(() => setShowAlert(false), 3000);
        }
      } else {
        console.error("Failed to fetch delete response: ", res.statusText);
        setAlertMessage("Failed to delete employee. Please try again.");
        setAlertVariant("danger");
        setShowAlert(true);

        setTimeout(() => setShowAlert(false), 3000);
      }
    } catch (error) {
      console.error("Error deleting employee: ", error);
      setAlertMessage("An error occurred. Please try again.");
      setAlertVariant("danger");
      setShowAlert(true);

      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEmployees = employees.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <section className="contact-section">
        <div className="auto-container">
          <div className="contact-title">
            <h2>Employees</h2>
          </div>
          {showAlert && (
            <Alert
              variant={alertVariant}
              onClose={() => setShowAlert(false)}
              dismissible
              className="mb-4 success_alert"
            >
              {alertMessage}
            </Alert>
          )}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Active</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Added Date</th>
                <th>Role</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee) => (
                <tr key={employee.employee_id}>
                  <td>{employee.employee_id}</td>
                  <td>{employee.active_employee ? "Yes" : "No"}</td>
                  <td>{employee.employee_first_name}</td>
                  <td>{employee.employee_last_name}</td>
                  <td>{employee.employee_email}</td>
                  <td>{employee.employee_phone}</td>
                  <td>
                    {format(
                      new Date(employee.added_date),
                      "MM-dd-yyyy HH:mm:ss"
                    )}
                  </td>
                  <td>{employee.company_role_name}</td>
                  <td>
                    <div className="d-flex justify-center align-middle text-center">
                      <FaEdit
                        style={{ marginRight: "8px", cursor: "pointer" }}
                        title="Edit Employee"
                        onClick={() => {
                          handleEditClick(employee.employee_id);
                        }}
                      />
                      <FaTrash
                        style={{ cursor: "pointer" }}
                        title="Delete Employee"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteEmployee(employee.employee_id);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination className="justify-content-center pt-3">
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages).keys()].map((page) => (
              <Pagination.Item
                key={page + 1}
                active={page + 1 === currentPage}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      </section>
    </>
  );
};

export default EmployeesList;
