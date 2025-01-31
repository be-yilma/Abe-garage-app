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

// Export functions

const customerService = {
  getAllCustomers,
};

export default customerService;
