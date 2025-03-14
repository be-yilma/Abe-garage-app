const backend = import.meta.env.VITE_API_URL;

// a function to send get requests to fetch all customers
const getAllCustomers = async (token) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`${backend}/api/customers`, requestOptions);

    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Fetch failed", error);
    throw error;
  }
};

const createCustomer = async (Data, token) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(Data),
    };

    const response = await fetch(`${backend}/api/add-customer`, requestOptions);
    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error("Fetch failed", error);
    throw error;
  }
};

// a function to send get requests to fetch a single customer
const getCustomerById = async (customerId, token) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      `${backend}/api/customer/${customerId}`,
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

// a function to send put requests to update a customer

const updateCustomer = async (customerId, updatedData, token) => {
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
      `${backend}/api/customer/${customerId}`,
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

// Export functions

const customerService = {
  getAllCustomers,
  createCustomer,
  getCustomerById,
  updateCustomer,
};

export default customerService;
