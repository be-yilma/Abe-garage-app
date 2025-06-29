import React from "react";
import { Link } from "react-router-dom";
import leaderbg from "../../../assets/images/2.jpg";
const Working = () => {
  return (
    <>
      <section className="video-section">
        <div
          data-parallax='{"y": 50}'
          className="sec-bg"
          style={{
            backgroundImage: `url(${leaderbg})`,
          }}
        ></div>
        <div className="auto-container">
          <h5>Working since 1992</h5>
          <h2>
            We are leader <br />
            in Car Mechanical Work
          </h2>
          <div className="video-box">
            <div className="video-btn">
              <Link
                to="#"
                className="overlay-link lightbox-image video-fancybox ripple"
              >
                <i className="flaticon-play"></i>
              </Link>
            </div>
            <div className="text">
              Watch intro video <br />
              about us
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Working;
