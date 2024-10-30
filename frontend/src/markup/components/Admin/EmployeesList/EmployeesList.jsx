import React, { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";

const EmployeesList = () => {
  //  create all the states we nedd to store the data
  const [employees, setEmployees] = React.useState([]);
  //  a state to server as a flage to show the errro message
  const [apiError, setApiError] = useState(false);
  // a state to store error messages
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  // to get the logged in employee token
  const { employee } = useAuth();
  let token = null; // to store the token
  if (employee) {
    token = employee.employee_token;
  }

  // useEffect to fetch the employee data
  useEffect((token) => {
    // call the getAllEmployees functinon to get the employee 
    const allEmployees=em

  }, []);

  return (
    <div>
      <h1>employee testtttt</h1>
    </div>
  );
};

export default EmployeesList;
