// Function to read the data from the user's local storage token
const getAuth = async () => {
  // Read the token from the local storage
  const employee = await JSON.parse(localStorage.getItem("employee"));
  // if the token is valid, return it
  if (employee && employee.employee_token) {
    const decodeToken = await decodeTokenPayload(employee.employee_token);
    employee.employee_first_name = decodeToken.employee_first_name;
    employee.employee_last_name = decodeToken.employee_last_name;
    employee.employee_id = decodeToken.employee_id;
    employee.employee_role = decodeToken.company_role_id;
    return employee;
  } else {
    return {};
  }
};

// function to decode the payload from the user's local storage token
const decodeTokenPayload = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );
  return JSON.parse(jsonPayload);
};
// export getAuth
export default getAuth;
