// import a utility function to retrieve authentication information from local storage
import { Navigate } from "react-router-dom";
import getAuth from "../../../util/auth";

import React, { useEffect, useState } from "react";

const PrivateAuthRoute = ({ roles, children }) => {
  // state to track whether the user is authenticated or not
  const [isChecked, setIsChecked] = useState(false);

  // state to track whether the user is logged in or not
  const [isLogged, setIsLogged] = useState(false);

  // state to track whether the user has the proper role and authorization
  const [isAuthorized, setIsAuthorized] = useState(false);

  // useEffect hook to run when the component is mounted or when roles are changed
  useEffect(() => {
    // retrieve logged-in employees ... such as token and roles ... from local storage
    const loggedInEmployee = getAuth();
    // once the authentication data is available
    loggedInEmployee.then((response) => {
      // check if the user has a valid token, meaning they are logged in
      if (response.employee_token) {
        // set isLogged state to true
        setIsLogged(true);
        // check if the user has the required roles to access the route
        if (
          roles &&
          roles.length > 0 &&
          roles.includes(response.employee_role)
        ) {
          // set isAuthorized state to true
          setIsAuthorized(true);
        }
      }

      // set the checked state to true once teh authorization and authentication is completed
      setIsChecked(true);
    });
  }, [roles]);
  // if the user is not authenticated, redirect them to the login page
  if (isChecked) {
    // if user is not authenticated, redirect them to the login page
    if (!isLogged) {
      return <Navigate to="/login" />;
    }
    // if the user is logged in , but not authorized, redirect them to the Unauthorized page
    if (!isAuthorized) {
      return <Navigate to="/unauthorized" />;
    }
  }

  // render the children component only when the user is authenticated and authorized
  return children;
};

export default PrivateAuthRoute;
