import React from "react";
import ServiceList from "../../components/Admin/ServiceList/ServiceList";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import { useAuth } from "../../../context/AuthContext";
import LoginForm from "../../components/LoginForm/LoginForm";

const Services = () => {
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
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <ServiceList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
