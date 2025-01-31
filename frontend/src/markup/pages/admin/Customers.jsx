import React from "react";
import { useAuth } from "../../../context/AuthContext";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import CustomerList from "../../components/Admin/CustomerList/CustomerList";
import LoginForm from "../../components/LoginForm/LoginForm";

const Customers = () => {
  // destucted the data fro useAuth
  const { isLogged, isAdmin, isManager } = useAuth();
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

  //// if logged in , but not an admin or manager. display unauthorized component
  if (isLogged && !isAdmin && !isManager) {
    return (
      <div>
        <h1 className="text-danger text-center mt-5 h4 ">
          You are not authorized to access this page
        </h1>
        <LoginForm />
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
            <CustomerList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
