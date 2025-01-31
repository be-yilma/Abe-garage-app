// import the getAuth funcion
import getAuth from "../util/auth";
// import importanant hooks
import React, { useState, useEffect, useContext } from "react";

// create a new context object for the authentication data
const AuthContext = React.createContext();

// custome hook to access the authcation context data
export const useAuth = () => {
  return useContext(AuthContext);
};
// create a Provider component that wraps the app and provides the authentication data

export const AuthProvider = ({ children }) => {
  // state to check if the user is logged in
  const [isLogged, setIsLogged] = useState(false);
  // state to track is the user is an admin
  const [isAdmin, setIsAdmin] = useState(false);
  // state to track is the user is an mangaer
  const [isManger, setIsManger] = useState(false);
  // state to store the user information
  const [employee, setEmployee] = useState(null);

  //   create a value object to pass down the states
  const value = {
    isLogged,
    setIsLogged,
    isAdmin,
    setIsAdmin,
    employee,
    isManger,
    setIsManger,
  };

  // useEffect runs on a component that check authentication status
  useEffect(() => {
    // retriev the logged in user from the loacal storage
    const loggedInEmployee = getAuth();
    console.log(loggedInEmployee);
    loggedInEmployee.then((response) => {
      if (response.employee_token) {
        setIsLogged(true);
        if (response.employee_role === 3) {
          setIsAdmin(true);
        } else if (response.employee_role === 2) {
          setIsManger(true);
        }
        setEmployee(response);
      }
    });
  }, []); // to ensuere this runs only once when the componet is loaded

  //   return the context provider wrapping around children , passing the data

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
