import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import customerService from "../../../../services/customer.service";

const CustomerList = () => {
  // States to manage data and UI
  const [customers, setCustomers] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  // state to success message
  const [successMessage, setSuccessMessage] = useState(null);

  // Get the logged-in employee details from the context (AuthContext)
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  // fetches customer data
  useEffect(() => {
    //Define an async function to fetch customer data
    const fetchCustomers = async () => {
      try {
        // Make an API call to fetch customers
        const res = await customerService.getAllCustomers(token);

        // check if the api call succeeded
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
              "Failed to fetch customers. Please check your internet connection."
            );
          }
          return;
        }

        // If the API call was successful, update the customers state
        const data = await res.json();
        // console.log("customers list", data.data);
        if (data.data && data.data.length > 0) {
          setCustomers(data.data);
        }
      } catch (error) {
        // handle any unexpected error (e.g. network error)
        console.error("Error fetching customers:", error);
        // TODO: Implement a proper error handling mechanism here
        setApiError(true);
        setApiErrorMessage("Failed to fetch customers. Please try again.");
      }
    };

    fetchCustomers(); // Call the fetchCustomers function
  }, [token]); // Run this effect whenever the token changes

  // console.log(customers);
  return (
    <div>
      {customers.map(function (customer) {
        return (
          <div key={customer.customer_id}>
            <h2>{customer.customer_first_name}</h2>
            <p>{customer.customer_email}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CustomerList;
