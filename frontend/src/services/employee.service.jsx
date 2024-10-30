// a fuction to send post requests to create anew employee
const backend = import.meta.env.VITE_API_URL;
const createEmployee = async (formData, loggedInEmployeeToken) => {
  // check backend url
  console.log("Backend URL: " + backend);
  console.log("Fetch URL: ", `${backend}/api/employee`);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };

  const response = await fetch(`${backend}/api/employee`, requestOptions);
  // if (!response.ok) {
  //   throw new Error(`buzu: ${response.status}`);
  // }
  return response;
};

// export all the functions
const employeeService = {
  createEmployee,
};

export default employeeService;
