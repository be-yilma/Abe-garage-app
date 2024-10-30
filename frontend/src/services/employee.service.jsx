// a fuction to send post requests to create anew employee
const backend = import.meta.env.VITE_API_URL;
const createEmployee = async (formData) => {
  try {
    // check backend url
    console.log("Backend URL: " + backend);
    console.log("Fetch URL: ", `${backend}/api/employee`);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch(`${backend}/api/employee`, requestOptions);
    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error("Fetch failed", error);
    throw error;
  }
};

// a function to send get requests to fetch all employees
const getAllEmployees = async (token) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };

    const response = await fetch(`${backend}/api/employee`, requestOptions);

    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Fetch failed", error);
    throw error;
  }
};

// export all the functions
const employeeService = {
  createEmployee,
  getAllEmployees,
};

export default employeeService;
