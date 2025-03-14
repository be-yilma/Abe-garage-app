import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import serviceService from "../../../../services/service.service";
import { FaEdit, FaTrash } from "react-icons/fa";

import classes from "./serviceList.module.css";
import AddServiceForm from "../AddServiceFom/AddServiceForm";

const ServiceList = () => {
  // States to manage data and UI
  const [services, setServices] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  // state to success message
  const [successMessage, setSuccessMessage] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [loading, setloading] = useState(true);

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  const fetchServices = async () => {
    setloading(true);
    setApiError(false);
    setApiErrorMessage(null);
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
      } else {
        setServices([]); // insuered services are empty
      }
      setApiError(false);
      setApiErrorMessage(null);
    } catch (error) {
      console.error("Error fetching employees: ", error);
      setApiError(true);
      setApiErrorMessage("Failed to fetch services. Please try again.");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [token]);

  // handle delete service request
  const handleDeleteService = async (serviceId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (!confirmDelete) return;

    try {
      const res = await serviceService.deleteService(serviceId, token);

      if (!res.ok) {
        setApiError("Failed to delete service");
        return;
      }

      const data = await res.json();

      if (data.success) {
        const updatedServices = services.filter(
          (service) => service.service_id !== serviceId
        );
        setServices(updatedServices);
        setSuccessMessage("Service deleted successfully");
      } else {
        setApiError("Failed to delete service");
      }
    } catch (error) {
      console.error("Error in handleDeleteService:", error);
      setApiError("Failed to delete service");
    }
  };

  // handle edit service request
  const handleEditService = (service) => {
    if (service) {
      setEditingService(service);
    } else {
      console.warn("Attempted to set editingService to an undefined value.");
    }
  };

  // function to handle update service
  const handleUpdateService = async (updatedService) => {
    setServices((preServices) => {
      const serviceExists = preServices.find(
        (service) => service.service_id === updatedService.service_id
      );

      if (serviceExists) {
        return preServices.map((service) =>
          service.service_id === updatedService.service_id
            ? updatedService
            : service
        );
      }
      return [...preServices, updatedService];
    });

    fetchServices(); // refetch services after update or add services
    setEditingService(null); // reset editingService state form
  };

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
                    <FaEdit
                      className={classes.icon}
                      style={{ cursor: "pointer" }}
                      title="Edit service"
                      onClick={() => handleEditService(service)}
                    />
                    <FaTrash
                      className={classes.icon_delete}
                      style={{ cursor: "pointer" }}
                      title="Delete service"
                      onClick={() => handleDeleteService(service.service_id)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <AddServiceForm
                editingService={editingService}
                onServiceUpdated={handleUpdateService}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceList;
