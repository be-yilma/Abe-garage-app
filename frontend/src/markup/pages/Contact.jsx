import React from "react";
import titleImg from "../../assets/images/bg-images/3.jpg";
import { Link } from "react-router-dom";
import Schedule from "../components/Schedule/Schedule";
const Contact = () => {
  return (
    <>
      {/* services us Page Title  */}
      <section
        className="page-title"
        style={{
          backgroundImage: `url(${titleImg})`,
        }}
      >
        <div className="auto-container">
          <h2>Contact Us </h2>

          <ul className="page-breadcrumb">
            <li>
              <Link to="/">home</Link>
            </li>
            <li>Contac</li>
          </ul>
        </div>
        <h1 data-parallax='{"x": 200}'>Car Repairing</h1>
      </section>

      {/* <!--Contact Section--> */}
      <section className="contact-section">
        <div className="auto-container">
          <div className="row clearfix">
            {/* <!--Form Column--> */}
            <div className="form-column col-lg-7">
              <div className="inner-column">
                {/* Location  */}

                <div classNameName="inner-column">
                  {/* <!-- Map Section --> */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24834.837800108096!2d-77.01722142568362!3d38.915869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b93a6c9e1897%3A0x1a57098fc4bef6f9!2sAYT%20Auto%20Service!5e0!3m2!1sen!2sus!4v1748016640929!5m2!1sen!2sus"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* <!--Info Column--> */}
            <div className="info-column col-lg-5">
              <div className="inner-column">
                <h4>Our Address</h4>
                <div className="text">
                  Completely synergize resource taxing relationships via premier
                  niche markets. Professionally cultivate one-to-one customer
                  service.
                </div>
                <ul>
                  <li>
                    <i className="flaticon-pin"></i>
                    <span>Address:</span> 54B, Tailstoi Town 5238 MT, La city,
                    IA 5224
                  </li>
                  <li>
                    <i className="flaticon-email"></i>
                    <span>email:</span> contact@buildtruck.com
                  </li>
                  <li>
                    <i className="flaticon-phone"></i>
                    <span>phone:</span> 1800 456 7890 / 1254 897 3654
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Schedule />
    </>
  );
};

export default Contact;
