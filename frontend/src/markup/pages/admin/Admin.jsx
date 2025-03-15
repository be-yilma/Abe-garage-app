import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import AdminDashboard from "../../components/Admin/AdminDashboard/AdminDashboard";
import { useAuth } from "../../../context/AuthContext";

const Admin = () => {
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
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AdminDashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
