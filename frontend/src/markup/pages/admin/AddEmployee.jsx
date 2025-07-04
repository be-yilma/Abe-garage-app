// Import the AddEmployeeForm component
import AddEmployeeForm from "../../components/Admin/AddEmployeeForm/AddEmployeeForm.jsx";
// Import the AdminMenu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu.jsx";

function AddEmployee() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AddEmployeeForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
