// a function to send the login request to the server
const backend = import.meta.env.VITE_API_URL;

console.log(backend);
const logIn = async (formData) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    console.log(requestOptions.body);
    const response = await fetch(
      `${backend}/api/employee/login`,
      requestOptions
    );
    console.log(response);
    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error("Fetch failed", error);
    throw error;
  }
};

// Export the Login Function
const loginService = {
  logIn,
};

export default loginService;
