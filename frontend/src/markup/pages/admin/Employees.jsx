import React from "react";
// import useAuth hook to access the login information and role information
import { useAuth } from "../../../context/AuthContext";

// import loginform component
import LoginForm from "../../components/LoginForm/LoginForm";

const Employees = () => {
  // destucted the data fro useAuth
  const { isLogged, isAdmin } = useAuth();
  if (!isLogged) {
    return (
      <div>
        <h1 className="text-danger text-center mt-5 h4 ">
          Please Login to access this page
        </h1>
        <LoginForm />
      </div>
    );
  }

  //// if logged in , but not an admin . display unauthorized component
  if (isLogged && !isAdmin) {
    return (
      <div>
        <h1>
          Unauthorized access. You are not an admin. Please contact the
          administrator to access this page.
        </h1>
      </div>
    );
  }

  // if logged in and an admin, display the employees page
  return (
    <div>
      <h1>Employees Page</h1>
    </div>
  );
};

export default Employees;
