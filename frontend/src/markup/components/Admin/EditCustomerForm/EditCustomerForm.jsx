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

  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;
  // Fetch customer details on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await customerService.getCustomerById(customerId, token);
        const data = await res.json();
        console.log("customer data: ", data);

        setFormData({
          customer_first_name: data.data.customer_first_name,
          customer_last_name: data.data.customer_last_name,
          customer_phone_number: data.data.customer_phone_number,
          active_customer_status: data.data.active_customer_status,
          customer_email: data.data.customer_email,
        });
      } catch (error) {
        console.error("Error fetching customer details:", error);
        setServerError("Failed to fetch customer details");
      }
    };

    fetchData();
  }, [customerId, token]);

  // console.log(formData);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await customerService.updateCustomer(
        customerId,
        formData,
        token
      );

      const data = await res.json();
      console.log(data);
      if (data.success && res.ok) {
        setSuccessMessage("Customer updated successfully");
        setTimeout(() => navigate("/admin/customers"), 1000);
      } else {
        setServerError("Failed to update customer");
      }
    } catch (error) {
      console.error("Error updating customer:", error);
      setServerError("Failed to update customer. Please try again.");
    }
  };

  // Handle input change event
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
            Edit: {formData.customer_first_name} {formData.customer_last_name}
          </h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
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
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_last_name"
                        placeholder="Customer last name"
                        value={formData.customer_last_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_phone_number"
                        placeholder="Customer phone (555-555-5555)"
                        value={formData.customer_phone_number}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <label>
                        <input
                          type="checkbox"
                          name="active_customer_status"
                          checked={formData.active_customer_status}
                          onChange={handleInputChange}
                        />
                        <span className="me-4"> Is active customer</span>
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
