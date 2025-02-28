import React, { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import customerService from "../../../../services/customer.service";

const AddCustomerForm = () => {
  const [customer_email, setEmail] = useState("");
  const [customer_first_name, setFirstName] = useState("");
  const [customer_last_name, setLastName] = useState("");
  const [customer_phone_number, setPhoneNumber] = useState("");
  //Errors
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [serverError, setServerError] = useState("");
  //succee
  const [success, setSuccess] = useState(false);

  // create a variable to hold the user's token
  let token = "";
  // Destructure the auth hook and get the user token
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    token = employee.employee_token;
  }
  // function to handle a form submission
  const handleSubmit = async (e) => {
    // prevent default behavior
    e.preventDefault();
    // Handle client side validation
    let valid = true;
    if (!customer_first_name) {
      setFirstNameError("First name is required");
      valid = false;
    } else {
      setFirstNameError("");
    }

    // for email validation
    if (!customer_email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!customer_email.includes("@")) {
      setEmailError("Please enter a valid email format");
      valid = false;
    } else {
      const reqex = /^\S+@\S+\.\S+$/; // user@gmail.com
      if (!reqex.test(customer_email)) {
        setEmailError("Please enter a valid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }

    if (!valid) {
      return;
    }

    // if the validation is successful, send the data to the server
    const data = {
      customer_email,
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status: true,
    };

    // make a request to the server
    customerService
      .createCustomer(data, token)
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
          <h2>Add a new customer</h2>
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
                        name="customer_email"
                        placeholder="Customer email"
                        value={customer_email}
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
                        name="customer_first_name"
                        placeholder="customer first name"
                        value={customer_first_name}
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
                        name="customer_last_name"
                        placeholder="customer last name"
                        value={customer_last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_phone_number"
                        placeholder="Customer phone (555-555-5555)"
                        value={customer_phone_number}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>Add customer</span>
                      </button>
                    </div>
                  </div>
                </form>
                {success && (
                  <div className="success-message" role="alert">
                    Customer added successfully! Redirecting
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

export default AddCustomerForm;
