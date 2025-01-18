// a fuction to send post requests to create anew employee
const backend = import.meta.env.VITE_API_URL;
const createEmployee = async (formData, token) => {
  // check backend url
  console.log("Backend URL: " + backend);
  console.log("Fetch URL: ", `${backend}/api/employee`);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  };

  const response = await fetch(`${backend}/api/employee`, requestOptions);
  // if (!response.ok) {
  //   throw new Error(`buzu: ${response.status}`);
  // }
  return response;
};

// a function to send get requests to fetch all employees
const getAllEmployees = async (token) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
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

// a function to send get requests to fetch an employee by id

const getEmployeeById = async (id, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `${backend}/api/employees/${id}`,
    requestOptions
  );

  return response;
};
// a fucntoin to update the employee

const updateEmployee = async (id, formData, token) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  };

  const response = await fetch(`${backend}/api/employee/${id}`, requestOptions);

  return response;
};
// export all the functions
const employeeService = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
};

export default employeeService;
