import { Link } from "react-router-dom";
import Bannerimg from "../../../assets/images/banner.jpg";
const Banner = () => {
  return (
    <>
      <section className="video-section banner_container">
        <div
          data-parallax='{"y": 50}'
          className="sec-bg"
          style={{
            backgroundImage: `url(${Bannerimg})`,
          }}
        ></div>
        <div className="auto-container">
          <h5>Working since 1992</h5>
          <h2>
            TuneUp Your Car <br />
            to Next Level
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

export default Banner;
