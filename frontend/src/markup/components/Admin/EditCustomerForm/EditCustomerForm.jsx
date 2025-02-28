import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import customerService from "../../../../services/customer.service";

const EditCustomerForm = () => {
  //   console.log(useParams()); // {customerId : "2"}
  // get the customerId form the url
  const { customerId } = useParams();
  const navigate = useNavigate();

  // State to store the data
  const [formData, setFormData] = useState({
    customer_first_name: "",
    customer_last_name: "",
    customer_phone_number: "",
    active_customer_status: false,
    customer_email: "",
  });

  // Other states

  const [serverError, setServerError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;
  // Fetch customer details on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await customerService.getCustomerById(customerId);
        if (!res.ok) {
          throw new Error("Failed to fetch employee details");
        }
        const data = await res.json();
        console.log(data);

        setFormData({
          customer_first_name: data.data.customer_first_name || "",
          customer_last_name: data.data.customer_last_name || "",
          customer_phone_number: data.data.customer_phone_number || "",
          active_customer_status: data.data.active_customer_status || false,
          customer_email: data.data.customer_email || "",
        });
      } catch (error) {
        console.error("Error fetching employee details:", error);
        setServerError("Failed to fetch employee details");
      }
    };

    fetchData();
  }, [customerId]);

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>
            Edit: {formData.customer_first_name} {formData.customer_last_name}
          </h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form>
                  <div className="row clearfix">
                    <div>
                      <p>Customer email : {formData.customer_email}</p>
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_first_name"
                        placeholder="Customer first name"
                        value={formData.customer_first_name}
                        // onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_last_name"
                        placeholder="Customer last name"
                        value={formData.customer_last_name}
                        // onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_phone_number"
                        placeholder="Customer phone (555-555-5555)"
                        value={formData.customer_phone_number}
                        // onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <label>
                        <input
                          type="checkbox"
                          name="active_customer_status"
                          checked={formData.active_customer_status}
                          // onChange={handleInputChange}
                        />
                        <span className="me-4"> Is active employee</span>
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

export default EditCustomerForm;
