import titleImg from "../../assets/images/22.jpg";
import OurServices from "../components/OurServices/OurServices";
import Schedule from "../components/Schedule/Schedule";
import WhyUs from "../components/WhyUs/WhyUs";
import { Link } from "react-router-dom";

const PublicServices = () => {
  return (
    <div>
      <>
        {/* services us Page Title  */}
        <section
          className="page-title"
          style={{
            backgroundImage: `url(${titleImg})`,
          }}
        >
          <div className="auto-container">
            <h2>Services </h2>

            <ul className="page-breadcrumb">
              <li>
                <Link to="/">home</Link>
              </li>
              <li>Services</li>
            </ul>
          </div>
          <h1 data-parallax='{"x": 200}'>Car Repairing</h1>
        </section>

        <OurServices />
        <WhyUs />
        <Schedule />
      </>
    </div>
  );
};

export default PublicServices;
