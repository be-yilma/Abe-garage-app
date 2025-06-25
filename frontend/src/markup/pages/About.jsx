import React from "react";
import { Link } from "react-router-dom";
import titleImg from "../../assets/images/bg-images/5.jpg";
import CarRepair from "../components/CarRepair/CarRepair";
import Schedule from "../components/Schedule/Schedule";
import WhyUs from "../components/WhyUs/WhyUs";
import Working from "../components/Working/Working";
import Workshop from "../components/Workshop/Workshop";
const About = () => {
  return (
    <>
      {/* about us Page Title  */}
      <section
        className="page-title"
        style={{
          backgroundImage: `url(${titleImg})`,
        }}
      >
        <div className="auto-container">
          <h2>About us</h2>

          <ul className="page-breadcrumb">
            <li>
              <Link to="/">home</Link>
            </li>
            <li>About us</li>
          </ul>
        </div>
        <h1 data-parallax='{"x": 200}'>Car Repairing</h1>
      </section>
      {/* car repair   */}
      <CarRepair />
      <Workshop />
      <WhyUs />
      <Working />
      <Schedule />
    </>
  );
};

export default About;
