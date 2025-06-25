import React from "react";
import { useAuth } from "../../../context/AuthContext";
import LoginForm from "../../components/LoginForm/LoginForm";
import CustomerProfile from "../../components/Admin/CustomerDetail/CustomerProfile";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";

const CustomerDetails = () => {
  //  destucted the data fro useAuth
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

  //// if logged in , but not an admin or manager. display unauthorized component
  if (isLogged && !isAdmin) {
    return (
      <div>
        <h1 className="text-danger text-center mt-5 h4 ">
          You are not authorized to access this page
        </h1>
        <LoginForm />
      </div>
    );
  }
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <CustomerProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
