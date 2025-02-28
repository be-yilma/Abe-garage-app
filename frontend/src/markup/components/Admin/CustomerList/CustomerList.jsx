import React, { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { useAuth } from "../../../../context/AuthContext";
import customerService from "../../../../services/customer.service";
import { FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Pagination, Table } from "react-bootstrap";
import { format } from "date-fns";

import "./CustomerList.css";

const CustomerList = () => {
  // States to manage data and UI
  const [customers, setCustomers] = useState([]);

  // state to store filtered customers
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  // state to track if the search input has been changed
  const [searchInput, setSearchInput] = useState("");

  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  // state to success message
  const [successMessage, setSuccessMessage] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of employees per page
  const navigate = useNavigate();

  const [debounceSerarchTerm, setDebounceSerarchTerm] = useState("");

  // Get the logged-in employee details from the context (AuthContext)
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  // debounce the search term to prevent making too many api calls
  useDebounce(() => setDebounceSerarchTerm(searchInput), 500, [searchInput]);

  // fetches customer data
  useEffect(() => {
    //Define an async function to fetch customer data
    const fetchCustomers = async () => {
      try {
        // Make an API call to fetch customers
        const res = await customerService.getAllCustomers(token); // retures the customers .. response

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

        // console.log("before changed to js obejct", res);

        // If the API call was successful, update the customers state

        const data = await res.json(); // to javascript object

        // console.log("after changed to js obejct", data);
        // console.log(data.data);

        // console.log("customers list", data.data);
        if (data.data && data.data.length > 0) {
          setCustomers(data.data);
          setFilteredCustomers(data.data);
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

  // Searche filtering

  useEffect(() => {
    // Filter customers when the search input changes
    const filtered = customers.filter((customer) => {
      return (
        customer.customer_first_name
          .toLowerCase()
          .includes(debounceSerarchTerm.toLowerCase()) ||
        customer.customer_last_name
          .toLowerCase()
          .includes(debounceSerarchTerm.toLowerCase()) ||
        customer.customer_email
          .toLowerCase()
          .includes(debounceSerarchTerm.toLowerCase()) ||
        customer.customer_phone_number
          .toLowerCase()
          .includes(debounceSerarchTerm.toLowerCase())
      );
    });

    // Update teh filterdCustomers state with the filtered results
    setFilteredCustomers(filtered);
    setCurrentPage(1); // reset the page to 1 when the search input changes
  }, [debounceSerarchTerm, customers]); // run the effect whenever search debounceSerarchTerm or customers changes

  // console.log(filteredCustomers);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const renderCustomerRows = () => {
    // Pagination logic
    const indexOfLastCustomer = currentPage * itemsPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;

    const currentCustomers = filteredCustomers.slice(
      indexOfFirstCustomer,
      indexOfLastCustomer
    );
    if (currentCustomers.length === 0) {
      return (
        <tr>
          <td colSpan="8" className="text-center">
            No customers match your search query
          </td>
        </tr>
      );
    }

    return currentCustomers.map((customer) => (
      <tr key={customer.customer_id}>
        <td>{customer.customer_id}</td>
        <td>{customer.customer_first_name}</td>
        <td>{customer.customer_last_name}</td>
        <td>{customer.customer_email}</td>
        <td>{customer.customer_phone_number}</td>
        <td>{format(new Date(customer.customer_added_date), "yyyy-MM-dd")}</td>
        <td>{customer.active_customer_status ? "Yes" : "No"}</td>
        <td>
          <FaExternalLinkAlt
            style={{ cursor: "pointer" }}
            title="customer details"
          />
          <FaEdit
            style={{ cursor: "pointer", marginLeft: "10px" }}
            title="Edit customer"
            onClick={() => {
              navigate(`/admin/edit-customer/${customer.customer_id}`);
            }}
          />
        </td>
      </tr>
    ));
  };

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>Customers</h2>
            </div>

            {/* Search Input */}
            <div className="search_container">
              <input
                type="text"
                placeholder="Search for a customer using first name, last name, email address or phone number"
                className="search_input"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <span className="search_icon">
                <i className="fa fa-search"></i>
              </span>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Added Date</th>
                  <th>Active</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>{renderCustomerRows()}</tbody>
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
              {[...Array(totalPages).keys()]?.map((page) => (
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
      )}
    </>
  );
};

export default CustomerList;
