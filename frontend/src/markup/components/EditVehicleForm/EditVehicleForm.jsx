import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import vehicleService from "../../../services/vehicle.service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../context/AuthContext";

const EditVehicleForm = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    vehicle_make: "",
    vehicle_model: "",
    vehicle_year: "",
    vehicle_color: "",
    vehicle_tag: "",
    vehicle_mileage: "",
    vehicle_serial: "",
    vehicle_type: "",
    customer_id: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { employee } = useAuth();
  const token = employee?.employee_token;

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await vehicleService.getVehicleByID(vehicleId, token);
        const data = await res.json();

        console.log("Fetched vehicle:", data);

        if (res.ok && data.status === "success") {
          const vehicle = data.vehicle;

          console.log(vehicle);

          setFormData({
            vehicle_make: vehicle.vehicle_make || "",
            vehicle_model: vehicle.vehicle_model || "",
            vehicle_year: vehicle.vehicle_year || "",
            vehicle_color: vehicle.vehicle_color || "",
            vehicle_tag: vehicle.vehicle_tag || "",
            vehicle_mileage: vehicle.vehicle_mileage || "",
            vehicle_serial: vehicle.vehicle_serial || "",
            vehicle_type: vehicle.vehicle_type || "",
            customer_id: vehicle.customer_id || "",
          });
        } else {
          setError(data.message || "Failed to load vehicle data.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch vehicle.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [vehicleId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await vehicleService.updateVehicle(
        vehicleId,
        formData,
        token
      );
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Vehicle updated successfully!");
        setTimeout(
          () => navigate(`/admin/customer/${formData.customer_id}`),
          1500
        );
      } else {
        toast.error(data.message || "Update failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error(" Failed to update vehicle.");
    }
  };

  if (loading) return <div>Loading vehicle...</div>;

  return (
    <section className="contact-section ml-4">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Edit Vehicle</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_year"
                        value={formData.vehicle_year}
                        onChange={handleChange}
                        placeholder="Vehicle year"
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_make"
                        value={formData.vehicle_make}
                        onChange={handleChange}
                        placeholder="Vehicle make"
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_model"
                        value={formData.vehicle_model}
                        onChange={handleChange}
                        placeholder="Vehicle model"
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_type"
                        value={formData.vehicle_type}
                        onChange={handleChange}
                        placeholder="Vehicle type"
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_mileage"
                        value={formData.vehicle_mileage}
                        onChange={handleChange}
                        placeholder="Vehicle mileage"
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_tag"
                        value={formData.vehicle_tag}
                        onChange={handleChange}
                        placeholder="Vehicle tag"
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_serial"
                        value={formData.vehicle_serial}
                        onChange={handleChange}
                        placeholder="Vehicle serial"
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_color"
                        value={formData.vehicle_color}
                        onChange={handleChange}
                        placeholder="Vehicle color"
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <button type="submit" className="theme-btn btn-style-one">
                        <span>Update</span>
                      </button>
                    </div>
                  </div>
                </form>

                {error && (
                  <div className="validation-error mt-2" role="alert">
                    {error}
                  </div>
                )}

                <ToastContainer position="top-right" autoClose={2000} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditVehicleForm;
