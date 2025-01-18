import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import EditEmployeeForm from "../../components/Admin/EditEmployeeForm/EditEmployeeForm";

const EditEmployee = () => {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EditEmployeeForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
