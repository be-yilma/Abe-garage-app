// Import the logo image
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { useAuth } from "../../../context/AuthContext";

// import the login service
import loginService from "../../../services/login.service";
import useStickyHeader from "./StickyHeader";

function Header() {
  useStickyHeader();
  // use the custome hook to access the data in  the context
  const { isLogged, setIsLogged, employee, isAdmin } = useAuth();
  console.log(useAuth());

  // function to log out the user
  const logOut = () => {
    // call the logout method from the login service
    loginService.logOut();
    // set the user is logged to false
    setIsLogged(false);
  };
  return (
    <div>
      <header className="main-header header-style-one">
        <div className="header-top">
          <div className="auto-container">
            <div className="inner-container">
              <div className="left-column">
                <div className="text">Enjoy the Beso while we fix your car</div>
                <div className="office-hour">
                  Monday - Saturday 7:00AM - 6:00PM
                </div>
              </div>
              <div className="right-column">
                {isLogged ? (
                  <div className="phone-number">
                    Welcome: <strong>{employee?.employee_first_name}</strong>
                  </div>
                ) : (
                  <div className="phone-number">
                    Schedule Your Appontment Today :{" "}
                    <strong>1800 456 7890</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="header-upper">
          <div className="auto-container">
            <div className="inner-container">
              <div className="logo-box">
                <div className="logo">
                  <a href="/">
                    <img src={logo} alt="" />
                  </a>
                </div>
              </div>
              <div className="right-column">
                <div className="nav-outer">
                  <div className="mobile-nav-toggler">
                    <img src="assets/images/icons/icon-bar.png" alt="" />
                  </div>
                  <nav className="main-menu navbar-expand-md navbar-light">
                    <div
                      className=" navbar-collapse show clearfix"
                      id="navbarSupportedContent"
                    >
                      <ul className="navigation">
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        <li>
                          <Link to="/about">About Us</Link>
                        </li>
                        <li>
                          <Link to="/services">Services</Link>
                        </li>
                        <li>
                          <Link to="/contact">Contact Us</Link>
                        </li>
                        {/* only show this if user is admin */}
                        {isAdmin && (
                          <li>
                            <Link to="/admin">Admin</Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </nav>
                </div>
                <div className="search-btn"></div>
                {isLogged ? (
                  <div className="link-btn bg-blue-900">
                    <Link
                      to="/"
                      className="theme-btn btn-style-one blue"
                      onClick={logOut}
                    >
                      Logout
                    </Link>
                  </div>
                ) : (
                  <div className="link-btn">
                    <Link to="/login" className="theme-btn btn-style-one ">
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="sticky-header">
          <div className="header-upper">
            <div className="auto-container">
              <div className="inner-container">
                <div className="logo-box">
                  <div className="logo">
                    <Link to="/">
                      <img src="assets/images/custom/logo.png" alt="" />
                    </Link>
                  </div>
                </div>
                <div className="right-column">
                  <div className="nav-outer">
                    <div className="mobile-nav-toggler">
                      <img src="assets/images/icons/icon-bar.png" alt="" />
                    </div>

                    <nav className="main-menu navbar-expand-md navbar-light">
                      <ul className="navigation">
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        <li>
                          <Link to="/about">About Us</Link>
                        </li>
                        <li>
                          <Link to="/services">Services</Link>
                        </li>
                        <li>
                          <Link to="/contact">Contact Us</Link>
                        </li>
                        {/* only show this if user is admin */}
                        {isAdmin && (
                          <li>
                            <Link to="/admin">Admin</Link>
                          </li>
                        )}
                      </ul>
                    </nav>
                  </div>
                  <div className="search-btn"></div>
                  {isLogged ? (
                    <div className="link-btn">
                      <Link
                        to="/"
                        className="theme-btn btn-style-one blue"
                        onClick={logOut}
                      >
                        Logout
                      </Link>
                    </div>
                  ) : (
                    <div className="link-btn">
                      <Link to="/login" className="theme-btn btn-style-one ">
                        Login
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-menu">
          <div className="menu-backdrop"></div>
          <div className="close-btn">
            <span className="icon flaticon-remove"></span>
          </div>

          <nav className="menu-box">
            <div className="nav-logo">
              <Link to="index.html">
                <img src="assets/images/logo-two.png" alt="" title="" />
              </Link>
            </div>
            <div className="menu-outer"></div>
          </nav>
        </div>

        <div className="nav-overlay">
          <div className="cursor"></div>
          <div className="cursor-follower"></div>
        </div>
      </header>
    </div>
  );
}

export default Header;
