import React from "react";
// import useAuth hook to access the login information and role information
import { useAuth } from "../../../context/AuthContext";

// import loginform component
import LoginForm from "../../components/LoginForm/LoginForm";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import EmployeesList from "../../components/Admin/EmployeesList/EmployeesList";

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
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EmployeesList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
