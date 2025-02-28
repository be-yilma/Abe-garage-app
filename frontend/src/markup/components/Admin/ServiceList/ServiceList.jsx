import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import serviceService from "../../../../services/service.service";
import { FaEdit, FaTrash } from "react-icons/fa";

import classes from "./serviceList.module.css";

const ServiceList = () => {
  // States to manage data and UI
  const [services, setServices] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  // state to success message
  const [successMessage, setSuccessMessage] = useState(null);

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await serviceService.getAllServices(token);
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
        // console.log(data);
        // console.log(data.services);
        if (data.services && data.services.length > 0) {
          setServices(data.services);
        }
      } catch (error) {
        console.error("Error fetching employees: ", error);
        setApiError(true);
        setApiErrorMessage("Failed to fetch employees. Please try again.");
      }
    };
    fetchServices();
  }, [token]);

  console.log(services);

  return (
    <section className="contact-section">
      <div className="auto-container">
        {apiError ? (
          // Show error message if API call fails
          <div className="contact-title">
            <h2>Error Loading Services</h2>
            <p className="error-message">{apiErrorMessage}</p>
          </div>
        ) : (
          // Show service list if API call is successful
          <div className="m-4">
            <div className="contact-title">
              <h2>Services we provide</h2>
              <p className="text-muted text-justify ">
                Bring to the table win-win survival strategies to ensure
                proactive domination. At the end of the day, going forward, a
                new normal that has evolved from generation X is on the runway
                heading towards a streamlined cloud solution.
              </p>
            </div>

            {/* Service List */}
            <div className={classes.service_list}>
              {services.map((service) => (
                <div key={service.service_id} className={classes.service_item}>
                  <div className={classes.service_content}>
                    <h4>{service.service_name}</h4>
                    <p>{service.service_description}</p>
                  </div>
                  <div className={classes.service_actions}>
                    <FaEdit className={classes.icon} title="Edit service" />
                    <FaTrash
                      className={classes.icon_delete}
                      title="Delete service"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceList;
