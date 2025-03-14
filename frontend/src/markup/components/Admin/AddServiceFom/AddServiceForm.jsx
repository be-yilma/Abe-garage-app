import React, { useEffect, useState } from "react";
import classes from "./AddServiceForm.module.css";
import { useAuth } from "../../../../context/AuthContext";
import serviceService from "../../../../services/service.service";
const AddServiceForm = ({ editingService, onServiceUpdated }) => {
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  // erro  states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(editingService ? editingService.service_id : "No editingService");

  // Get the logged-in employee details from the context (AuthContext)
  const { employee } = useAuth();
  let token = employee ? employee.employee_token : null;

  useEffect(() => {
    if (editingService) {
      setServiceName(editingService.service_name);
      setServiceDescription(editingService.service_description);
    } else {
      setServiceName("");
      setServiceDescription("");
    }
  }, [editingService]);

  // console.log(serviceName);
  // console.log(serviceDescription);
  // console.log(editingService.service_id);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const serviceData = {
      service_name: serviceName,
      service_description: serviceDescription,
    };

    let serviceID = editingService ? editingService.service_id : null;
    console.log(serviceID);

    try {
      if (editingService) {
        // Edit existing service
        const updatedService = await serviceService.updateService(
          serviceID,
          serviceData,
          token
        );
        onServiceUpdated(updatedService);
      } else {
        // Add new service
        const addedService = await serviceService.addService(
          serviceData,
          token
        );
        onServiceUpdated(addedService);
      }

      // clear the form input
      setServiceName("");
      setServiceDescription("");
    } catch (error) {
      setError("an error occured. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container w-100">
        <div className="contact-title">
          <h2>
            <span>{editingService ? "Edit Service" : "Add a new service"}</span>
          </h2>
        </div>
        <div className={classes.add_service_wrapper}>
          <form onSubmit={handleSubmit}>
            <div className="form-group col-md-12">
              {setError && (
                <div className="validation-error" role="alert">
                  {error}
                </div>
              )}
            </div>

            <div className={classes.input_group}>
              <input
                type="text"
                name="service_name"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                placeholder="Service name"
                className={classes.input_field}
                required
              />
            </div>

            <div className={classes.input_group}>
              <textarea
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
                name="service description"
                placeholder="Service description"
                className={classes.textarea_field}
              ></textarea>
            </div>

            <div className={classes.button_container}>
              <button
                className="theme-btn btn-style-one"
                type="submit"
                data-loading-text="Please wait..."
              >
                <span>
                  {loading
                    ? editingService
                      ? "Updating..."
                      : "Adding..."
                    : editingService
                    ? "Update Service"
                    : "Add Service"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddServiceForm;
