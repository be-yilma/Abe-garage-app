import { useState } from "react";
import loginSevice from "../../../services/login.service";
function LoginForm() {
  // create a state to collect all the information
  const [employee_email, setEmail] = useState("");
  const [employee_password, setPassword] = useState("");
  // //Errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  // function to handle tthe form submission
  const handleSumbit = (event) => {
    event.preventDefault();
    // handle client side validation errors
    let valid = true; // flag
    // Email validation
    if (!employee_email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!employee_email.includes("@")) {
      setEmailError("Please enter a valid email format");
      valid = false;
    } else {
      const reqex = /^\S+@\S+\.\S+$/; // user@gmail.com
      if (!reqex.test(employee_email)) {
        setEmailError("Please enter a valid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }
    // for password validation
    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }
    //  stopping the validation
    if (!valid) {
      return;
    }
    // console.log(employee_email, employee_password);

    // sent the data to the server
    const formData = {
      employee_email,
      employee_password,
    };
    // call the login service
    const loginEmployee = loginSevice.logIn(formData);
    console.log(loginEmployee);
    loginEmployee
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        if (response.status === "success") {
          // save the user into the local storage
          if (response.data.employee_token) {
            console.log(response.data);
            localStorage.setItem("employee", JSON.stringify(response.data));
          }

          // redirect to the  user dashboard
          if (location.pathname === "/login") {
            // redirect to the home page
            window.location.replace("/");
          } else {
            window.location.reload();
          }
        } else {
          // Show an error message
          setServerError(response.message);
        }
      });
  };
  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Login to your account</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSumbit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      {serverError && (
                        <div className="validation-error" role="alert">
                          {serverError}
                        </div>
                      )}
                      <input
                        type="email"
                        name="employee_email"
                        placeholder="Email"
                        value={employee_email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {emailError && (
                        <div className="validation-error" role="alert">
                          {emailError}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="password"
                        name="employee_password"
                        placeholder="Password"
                        value={employee_password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {passwordError && (
                        <div className="validation-error" role="alert">
                          {passwordError}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>Login</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
