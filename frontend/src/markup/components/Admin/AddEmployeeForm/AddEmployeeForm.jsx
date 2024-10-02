import { useState } from "react";
import employeeService from "../../../../services/employee.service";
function AddEmployeeForm() {
  const [employee_email, setEmail] = useState("");
  const [employee_first_name, setFirstName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_phone, setPhoneNumber] = useState("");
  const [employee_password, setPassword] = useState("");
  const [active_employee] = useState(1);
  const [company_role_id, setCompany_role_id] = useState(1);
  // //Errors
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  // //succee
  const [success, setSuccess] = useState(false);
  // function to handle a form submission
  const handleSubmit = async (e) => {
    // prevent default behavior
    e.preventDefault();
    // Handle client side validation
    let valid = true;
    if (!employee_first_name) {
      setFirstNameError("First name is required");
      valid = false;
    } else {
      setFirstNameError("");
    }

    // for email validation
    if (!employee_email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!employee_email.includes("@")) {
      setEmailError("Please enter a valid email format");
      valid = false;
    } else {
      const reqex = /^\S+@\S+\.\S+$/; // user@gmail.com
      if (!reqex.test(employee_email)) {
        setEmailError("Please enter a valid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }

    // for password validation
    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }
    //  stopping the validation
    if (!valid) {
      return;
    }

    // if the validation is successful, send the data to the server
    const data = {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_password,
      active_employee,
      company_role_id,
    };
    employeeService.createEmployee(data)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setServerError(data.error);
        } else {
          setSuccess(true);
          setServerError("");
          // redirect
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setServerError(resMessage);
      });
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a new employee</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      {serverError && (
                        <div className="validation-error" role="alert">
                          {serverError}
                        </div>
                      )}
                      <input
                        type="text"
                        name="employee_email"
                        placeholder="Employee email"
                        value={employee_email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {emailError && (
                        <div className="validation-error" role="alert">
                          {emailError}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_first_name"
                        placeholder="Employee first name"
                        value={employee_first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      {firstNameError && (
                        <div className="validation-error" role="alert">
                          {firstNameError}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_last_name"
                        placeholder="Employee last name"
                        value={employee_last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_phone"
                        placeholder="Employee phone (555-555-5555)"
                        value={employee_phone}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <select
                        name="employee_role"
                        value={company_role_id}
                        onChange={(e) => setCompany_role_id(e.target.value)}
                        className="custom-select-box"
                      >
                        <option value="1">Employee</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </select>
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="password"
                        name="employee_password"
                        placeholder="Employee password"
                        value={employee_password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {passwordError && (
                        <div className="validation-error" role="alert">
                          {passwordError}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>Add employee</span>
                      </button>
                    </div>
                  </div>
                </form>
                {success && (
                  <div className="success-message" role="alert">
                    Employee added successfully! Redirecting
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddEmployeeForm;
