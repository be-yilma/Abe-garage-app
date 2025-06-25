import React, { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import vehicleService from "../../../../services/vehicle.service";
import { toast } from "react-toastify";

const AddVehicleForm = ({ customer_id, onVehicleAdd }) => {
  const [vehicle_year, setVehicleYear] = useState("");
  const [vehicle_make, setVehicleMake] = useState("");
  const [vehicle_model, setVehicleModel] = useState("");
  const [vehicle_type, setVehicleType] = useState("");
  const [vehicle_mileage, setVehicleMileage] = useState("");
  const [vehicle_tag, setVehicleTag] = useState("");
  const [vehicle_serial, setVehicleSerial] = useState("");
  const [vehicle_color, setVehicleColor] = useState("");

  const [serverError, setServerError] = useState("");

  let token = "";
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    token = employee.employee_token;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
      customer_id,
    };

    // Pass the vehicle data to the service
    vehicleService
      .addVehicle(formData, token)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setServerError(data.error);
          toast.error(data.error);
        } else {
          toast.success("Vehicle added successfully!");
          onVehicleAdd(formData); // send back the full object from server
        }
      })
      .catch((error) => {
        const errorMsg =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setServerError(errorMsg);
        toast.error("Failed to add vehicle. Try again later.");
      });
  };

  return (
    <section className="contact-section ml-5 pt-2">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add Customer's Vehicle</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    {serverError && (
                      <div className="validation-error col-md-12">
                        {serverError}
                      </div>
                    )}

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        placeholder="Vehicle Year"
                        value={vehicle_year}
                        onChange={(e) => setVehicleYear(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        placeholder="Vehicle Make"
                        value={vehicle_make}
                        onChange={(e) => setVehicleMake(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        placeholder="Vehicle Model"
                        value={vehicle_model}
                        onChange={(e) => setVehicleModel(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        placeholder="Vehicle Type"
                        value={vehicle_type}
                        onChange={(e) => setVehicleType(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        placeholder="Vehicle Mileage"
                        value={vehicle_mileage}
                        onChange={(e) => setVehicleMileage(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        placeholder="Vehicle Tag"
                        value={vehicle_tag}
                        onChange={(e) => setVehicleTag(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        placeholder="Vehicle Serial Number"
                        value={vehicle_serial}
                        onChange={(e) => setVehicleSerial(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        placeholder="Vehicle Color"
                        value={vehicle_color}
                        onChange={(e) => setVehicleColor(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <button type="submit" className="theme-btn btn-style-one">
                        <span>Add Vehicle</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddVehicleForm;
