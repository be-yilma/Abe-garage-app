import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import employeeService from "../../../../services/employee.service";
import { useAuth } from "../../../../context/AuthContext";

const EditEmployeeForm = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  // State to store the data
  const [formData, setFormData] = useState({
    employee_first_name: "",
    employee_last_name: "",
    employee_phone: "",
    active_employee: false,
    company_role_id: "",
    employee_email: "",
  });

  // Other states
  const [serverError, setServerError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  // Fetch employee details on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await employeeService.getEmployeeById(employeeId, token);
        if (!res.ok) {
          throw new Error("Failed to fetch employee details");
        }
        const data = await res.json();

        setFormData({
          employee_first_name: data.employee_first_name || "",
          employee_last_name: data.employee_last_name || "",
          employee_phone: data.employee_phone || "",
          active_employee: data.active_employee || false,
          company_role_id: data.company_role_id || "",
          employee_email: data.employee_email || "",
        });
      } catch (error) {
        console.error("Error fetching employee details:", error);
        setApiError(true);
        setApiErrorMessage("Failed to fetch employee details");
      }
    };

    fetchData();
  }, [employeeId, token]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...formData,
      active_employee: formData.active_employee ? 1 : 0, // Convert boolean to integer
    };

    try {
      console.log("Submitting payload:", payload); // Debugging log
      const response = await employeeService.updateEmployee(
        employeeId,
        payload,
        token
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update employee");
      }

      const data = await response.json();
      if (data.status === "success") {
        setSuccessMessage("Employee updated successfully");
        setTimeout(() => navigate("/admin/employees"), 2000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setServerError(error.message || "Failed to update employee");
    }
  };

  // Handle form field changes
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>
            Edit: {formData.employee_first_name} {formData.employee_last_name}
          </h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div>
                      <p>Employee email : {formData.employee_email}</p>
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_first_name"
                        placeholder="Employee first name"
                        value={formData.employee_first_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_last_name"
                        placeholder="Employee last name"
                        value={formData.employee_last_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_phone"
                        placeholder="Employee phone (555-555-5555)"
                        value={formData.employee_phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <select
                        name="company_role_id"
                        value={formData.company_role_id}
                        onChange={handleInputChange}
                        className="custom-select-box"
                      >
                        <option value="">Select Role</option>
                        <option value="1">Employee</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </select>
                    </div>
                    <div className="form-group col-md-12">
                      <label>
                        <input
                          type="checkbox"
                          name="active_employee"
                          checked={formData.active_employee}
                          onChange={handleInputChange}
                        />
                        <span>Is active employee</span>
                      </label>
                    </div>
                    <div className="form-group col-md-12">
                      <button className="theme-btn btn-style-one" type="submit">
                        <span>Update</span>
                      </button>
                    </div>
                  </div>
                </form>
                {serverError && (
                  <div className="validation-error" role="alert">
                    {serverError}
                  </div>
                )}
                {successMessage && (
                  <div className="success-message" role="alert">
                    {successMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditEmployeeForm;
