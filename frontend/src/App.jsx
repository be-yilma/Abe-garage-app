// Import the css files
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
// Import the custom css file
import "./assets/styles/custom.css";
import Footer from "./markup/components/Footer/Footer";
import Header from "./markup/components/Header/Header";
import Error from "./markup/pages/Error";
import Home from "./markup/pages/Home";
import Login from "./markup/pages/Login";
import AddEmployee from "./markup/pages/admin/AddEmployee";
import { Routes, Route } from "react-router-dom";
import Unauthorized from "./markup/pages/Unauthorized";
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";
import Employees from "./markup/pages/admin/Employees";
import Orders from "./markup/pages/admin/Orders";
import Customers from "./markup/pages/admin/Customers";
import EditEmployee from "./markup/pages/admin/EditEmployee";
import AddCustomer from "./markup/pages/admin/AddCustomer";
import EditCustomer from "./markup/pages/admin/EditCustomer";
import Services from "./markup/pages/admin/Services";
import Admin from "./markup/pages/admin/Admin";
import CustomerDetails from "./markup/pages/admin/CustomerDetails";
import EditVehicle from "./markup/pages/admin/EditVehicle";
import About from "./markup/pages/About";
import Contact from "./markup/pages/Contact";
import PublicServices from "./markup/pages/PublicServices";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<PublicServices />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* <Route path="/admin/add-employee" element={<AddEmployee />} /> */}

        <Route
          path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/add-customer"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddCustomer />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/Orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Orders />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Customers />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <PrivateAuthRoute roles={[3]}>
              <Employees />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/employees/edit/:employeeId"
          element={
            <PrivateAuthRoute roles={[3]}>
              <EditEmployee />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/vehicle/edit/:vehicleId"
          element={
            <PrivateAuthRoute roles={[3]}>
              <EditVehicle />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/edit-customer/:customerId"
          element={
            <PrivateAuthRoute roles={[3]}>
              <EditCustomer />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/customer/:customerId"
          element={
            <PrivateAuthRoute roles={[3]}>
              <CustomerDetails />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <PrivateAuthRoute roles={[3]}>
              <Services />
            </PrivateAuthRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateAuthRoute roles={[3]}>
              <Admin />
            </PrivateAuthRoute>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
