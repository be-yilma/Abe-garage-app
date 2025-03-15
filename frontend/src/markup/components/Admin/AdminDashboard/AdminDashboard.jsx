import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <section className="services-section style-three">
      <div className="auto-container">
        <div className="sec-title style-two">
          <h2>Admin Dashboard</h2>
          <div className="text">
            Bring to the table win-win survival strategies to ensure proactive
            domination. At the end of the day, going forward, a new normal that
            has evolved from generation X is on the runway heading towards a
            streamlined cloud solution.{" "}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 service-block-one">
            <Link to="/admin/orders">
              <div className="inner-box hvr-float-shadow">
                <h5>open for all</h5>
                <h2>All Orders</h2>
                <a href="#" className="read-more">
                  list of orders +
                </a>
                <div className="icon">
                  <span className="flaticon-power"></span>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 service-block-one">
            <Link to="/admin/order">
              <div className="inner-box hvr-float-shadow">
                <h5>open for leads</h5>
                <h2>New Order</h2>
                <a href="service-details.html" className="read-more">
                  add order +
                </a>
                <div className="icon">
                  <span className="flaticon-gearbox"></span>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 service-block-one">
            <Link to="/admin/employees">
              <div className="inner-box hvr-float-shadow">
                <h5>open for admins</h5>
                <h2>Employees</h2>
                <a href="service-details.html" className="read-more">
                  list of employees +
                </a>
                <div className="icon">
                  <span className="flaticon-brake-disc"></span>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 service-block-one">
            <Link to="/admin/add-employee">
              <div className="inner-box hvr-float-shadow">
                <h5>open for admins</h5>
                <h2>Add Employee</h2>
                <a href="service-details.html" className="read-more">
                  add employee +
                </a>
                <div className="icon">
                  <span className="flaticon-car-engine"></span>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 service-block-one">
            <Link to="/admin/customers">
              <div className="inner-box hvr-float-shadow">
                <h5>open for admins</h5>
                <h2>Customers</h2>
                <a href="service-details.html" className="read-more">
                  list of customers +
                </a>
                <div className="icon">
                  <span className="flaticon-tire"></span>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 service-block-one">
            <Link to="/admin/add-customer">
              <div className="inner-box hvr-float-shadow">
                <h5>open for admins</h5>
                <h2>Add Customer</h2>
                <a href="service-details.html" className="read-more">
                  add customer +
                </a>
                <div className="icon">
                  <span className="flaticon-spray-gun"></span>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 service-block-one">
            <Link to="/admin/services">
              <div className="inner-box hvr-float-shadow">
                <h5>open for admins</h5>
                <h2>Services</h2>
                <a href="service-details.html" className="read-more">
                  services +
                </a>
                <div className="icon">
                  <span className="flaticon-air-conditioning"></span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
