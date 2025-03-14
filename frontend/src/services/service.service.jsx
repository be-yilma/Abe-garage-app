const backend = import.meta.env.VITE_API_URL;

// a function to send get requests to fetch all services

const getAllServices = async (token) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`${backend}/api/services`, requestOptions);

    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Fetch failed", error);
    throw error;
  }
};

// a function to send delete requests to delete a specific service by id

const deleteService = async (serviceId, token) => {
  try {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      `${backend}/api/service/${serviceId}`,
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

// a function to send put requests to update a specific service by id

const updateService = async (serviceId, updatedData, token) => {
  try {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    };

    const response = await fetch(
      `${backend}/api/service/${serviceId}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Fetch failed", error);
    throw error;
  }
};

// a function to send post requests to add a new service

const addService = async (newServiceData, token) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newServiceData),
    };

    const response = await fetch(`${backend}/api/service`, requestOptions);

    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Fetch failed", error);
    throw error;
  }
};
// export the functions

const serviceService = {
  getAllServices,
  deleteService,
  updateService,
  addService,
};

export default serviceService;
