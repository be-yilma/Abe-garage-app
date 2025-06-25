import Banner from "../components/Banner/Banner";
import CustomerSatisfaction from "../components/CustomerSatisfaction/CustomerSatisfaction";
import OurServices from "../components/OurServices/OurServices";
import Schedule from "../components/Schedule/Schedule";
import WhyUs from "../components/WhyUs/WhyUs";
import Working from "../components/Working/Working";
import Workshop from "../components/Workshop/Workshop";

const Home = () => {
  return (
    <>
      <Banner />
      <Workshop />
      <OurServices />
      <CustomerSatisfaction />
      <WhyUs />
      <Working />
      <Schedule />
    </>
  );
};

export default Home;
