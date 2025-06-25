const backend = import.meta.env.VITE_API_URL;

// a function to add a new vehicle
const addVehicle = async (formData, token) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${backend}/api/add-vehicle`, requestOptions);
    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Fetch failed", error);
    throw error;
  }
};

// a function to get all vehicles
const getAllVehilces = async (token) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`${backend}/api/vehicles`, requestOptions);

    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Fetch failed", error);
    throw error;
  }
};

// a function to get all vehicles for a specific customer
const getAllCustomerVehicles = async (customer_id, token) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      `${backend}/api/vehicle/${customer_id}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Fetch failed", error);
    throw error;
  }
};

// a functin to get a vehicle by vehicle_id
const getVehicleByID = async (vehicle_id, token) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      `${backend}/api/single-vehicle/${vehicle_id}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Fetch failed", error);
    throw error;
  }
};

// a function to update a vehicle
const updateVehicle = async (vehicle_id, formData, token) => {
  try {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(
      `${backend}/api/vehicle/${vehicle_id}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Fetch failed", error);
    throw error;
  }
};

// a function to delete a vehicle

const deleteVehicle = async (vehicle_id, token) => {
  try {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      `${backend}/api/vehicle/${vehicle_id}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Fetch failed", error);
    throw error;
  }
};

// Exporting the functions
const vehicleService = {
  addVehicle,
  getAllVehilces,
  getAllCustomerVehicles,
  getVehicleByID,
  updateVehicle,
  deleteVehicle,
};

export default vehicleService;
