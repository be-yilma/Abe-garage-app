import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import customerService from "../../../../services/customer.service";
import styles from "./CustomerProfile.module.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import vehicleService from "../../../../services/vehicle.service";
import { Card } from "react-bootstrap"; // vehicle info
import AddVehicleForm from "../AddVehicleForm/AddVehicleFrom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerProfile = () => {
  // extract customer id uing useParams
  const { customerId } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState([]);
  const [vehicles, setVehicles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddVehicleForm, setShowAddVehicleForm] = useState(false);

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  // fetch customer details by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await customerService.getCustomerById(customerId, token);
        const data = await res.json();
        console.log("customer data: ", data);

        if (data?.success && data?.data) {
          setCustomer(data.data);
        }
      } catch (error) {
        console.error("Error fetching customer details:", error);
        setError("Failed to fetch customer details");
      }
    };

    fetchData();
  }, [customerId, token]);

  // fetch vehciles for the customer
  useEffect(() => {
    const fetchCustomersVehicle = async () => {
      try {
        const res = await vehicleService.getAllCustomerVehicles(
          customerId,
          token
        );
        const data = await res.json();
        console.log("vehicle data: ", data);

        if (data?.status === "success") {
          setVehicles(data.data);
        }
      } catch (error) {
        console.error("Error fetching customer details:", error);
        setError("Failed to fetch customer details");
      }
    };

    fetchCustomersVehicle();
  }, [customerId, token]);

  // console.log(vehicles);

  const handleAddVehicleClick = () => {
    setShowAddVehicleForm(true);
  };
  // handle edit
  const handleEditVehicle = (vehicleId) => {
    navigate(`/admin/vehicle/edit/${vehicleId}`);
  };

  // handle vehicle added
  const handleVehicleAdd = (newVehicle) => {
    setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
    setShowAddVehicleForm(false);
  };

  // handle delete vehicle
  const confirmDeleteVehicleToast = (vehicleId) => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this vehicle?</p>
          <div className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-sm btn-danger"
              onClick={async () => {
                try {
                  const res = await vehicleService.deleteVehicle(
                    vehicleId,
                    token
                  );

                  const data = await res.json();

                  if (data.success) {
                    setVehicles((prev) =>
                      prev.filter((v) => v.vehicle_id !== vehicleId)
                    );
                    toast.success("Vehicle deleted successfully");
                  } else {
                    toast.error(
                      `
                    Delete failed: ${data.message || "UnKnown error"}`
                    );
                  }
                } catch (error) {
                  toast.error("An erorr occurred.");
                } finally {
                  closeToast();
                }
              }}
            >
              Confirm
            </button>
            <button className="btn btn-sm btn-secondary" onClick={closeToast}>
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
      }
    );
  };

  if (!customer) {
    return <div>Loading ...</div>;
  }
  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  return (
    <div className="container mt-4">
      <Row>
        <Col md={2}>
          <section
            className="d-flex flex-column justify-content-between align-items-center"
            style={{ height: "100vh", position: "relative" }}
          >
            <div
              style={{
                position: "absolute",
                top: "50px",
                bottom: "50px",
                width: "2px",
                backgroundColor: "#e0e0e0",
                zIndex: 0,
              }}
            ></div>

            <Button
              variant="danger"
              className="rounded-circle"
              style={{
                width: "100px",
                height: "100px",
                position: "relative",
                zIndex: 1,
              }}
            >
              Info
            </Button>
            <Button
              variant="danger"
              className="rounded-circle"
              style={{
                width: "100px",
                height: "100px",
                position: "relative",
                zIndex: 1,
              }}
            >
              Cars
            </Button>
            <Button
              variant="danger"
              className="rounded-circle"
              style={{
                width: "100px",
                height: "100px",
                position: "relative",
                zIndex: 1,
              }}
            >
              Orders
            </Button>
          </section>
        </Col>
        <Col md={10}>
          {/* customer details */}
          <section className="my-3">
            <h3 className="text-2xl font-bold mb-2 ">
              Customer: {customer.customer_first_name}{" "}
              {customer.customer_last_name}
            </h3>
            <p className="m-0">
              <strong>Email:</strong>{" "}
              <span className="text-gray-400">{customer.customer_email}</span>
            </p>
            <p className="m-0">
              <strong>Phone Number:</strong>{" "}
              <span className="text-gray-400">
                {customer.customer_phone_number}
              </span>
            </p>
            <p className="m-0">
              <strong>Active Customer:</strong>{" "}
              <span className="text-gray-400">
                {customer.active_customer_status ? "Yes" : "No"}
              </span>
            </p>
            <p className="flex items-center gap-3 m-0">
              <strong>Edit Customer Info:</strong>{" "}
              <FaEdit
                className="text-red-700 me-3"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/admin/edit-customer/${customer.customer_id}`);
                }}
              ></FaEdit>
            </p>
          </section>
          {/* vehicle info */}
          <section className="mt-3">
            <h3 className="text-2xl font-bold text-blue-800 mb-3">
              Vehicles of {customer.customer_first_name}
            </h3>

            {vehicles?.length > 0 ? (
              <div className="d-flex flex-wrap gap-2">
                {vehicles.map((vehicle) => (
                  <Card
                    key={vehicle.vehicle_id}
                    className="shadow p-3 mb-3"
                    style={{ width: "18rem" }}
                  >
                    <Card.Body>
                      <Card.Title className="text-2xl font-bold mb-2">
                        {vehicle.vehicle_make} {vehicle.vehicle_model}
                      </Card.Title>
                      <Card.Text className="mb-1">
                        <strong>Vehicle color:</strong>{" "}
                        <span className="text-gray-400">
                          {vehicle.vehicle_color}
                        </span>
                      </Card.Text>
                      <Card.Text className="mb-1">
                        <strong>Vehicle tag:</strong>{" "}
                        <span className="text-gray-400">
                          {vehicle.vehicle_tag}
                        </span>
                      </Card.Text>
                      <Card.Text className="mb-1">
                        <strong>Vehicle year:</strong>{" "}
                        <span className="text-gray-400">
                          {vehicle.vehicle_year}
                        </span>
                      </Card.Text>
                      <Card.Text className="mb-1">
                        <strong>Vehicle type:</strong>{" "}
                        <span className="text-gray-400">
                          {vehicle.vehicle_type}
                        </span>
                      </Card.Text>
                      <Card.Text className="mb-1">
                        <strong>Vehicle mileage:</strong>{" "}
                        <span className="text-gray-400">
                          {vehicle.vehicle_mileage}
                        </span>
                      </Card.Text>
                      <div className="d-flex justify-content-center align-center mt-3">
                        <Card.Link href="#" title="Edit">
                          <FaEdit
                            className="text-primary"
                            title="Edit Vehicle"
                            onClick={() => {
                              handleEditVehicle(vehicle.vehicle_id);
                            }}
                          />
                        </Card.Link>
                        <Card.Link href="#" title="Delete">
                          <FaTrash
                            className="text-danger"
                            title="Delete vehicle"
                            onClick={() =>
                              confirmDeleteVehicleToast(vehicle.vehicle_id)
                            }
                          />
                        </Card.Link>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="bg-white text-gray-400 p-3 rounded shadow-gray-400 mb-4">
                No vehicles found for this customer.
              </p>
            )}
            {!showAddVehicleForm ? (
              <Button
                variant="danger"
                className="bg-red-500 text-white px-6 py-2 rounded mt-4"
                onClick={handleAddVehicleClick}
              >
                Add New Vehicle
              </Button>
            ) : (
              <div className="d-flex shadow-md justify-center mt-4 align-middle">
                <div className="p-4 rounded border w-100">
                  <div className="d-flex justify-end">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => setShowAddVehicleForm(false)}
                    >
                      X
                    </Button>
                  </div>
                  <AddVehicleForm
                    customer_id={customerId}
                    onVehicleAdd={handleVehicleAdd}
                  />
                </div>
              </div>
            )}
          </section>
          {/* order info */}
          <section className="mt-4">
            <h3 className="text-xl font-light text-blue-400 mb-4">
              Order of {customer.customer_first_name}
            </h3>
            <p className="bg-white text-gray-400 p-3 rounded shadow-gray-400 mb-4">
              No orders found
            </p>
          </section>
        </Col>
      </Row>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default CustomerProfile;
