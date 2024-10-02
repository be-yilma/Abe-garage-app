// collect every routes in there and export them to use in the app.js file

//  import the express module
const express = require("express");
// import the router module
const router = express.Router();

//  import the install route
const installRoute = require("./install.route");
//  add the login router to the middleware chain
router.use(installRoute);

// Import the employee routes
const employeeRoute = require("./employee.route");
// add the employee routes to the middleware chain
router.use(employeeRoute);

// Import the login routes
const loginRoute = require("./login.route");
// add the login routes to the middleware chain
router.use(loginRoute);

// export the router
module.exports = router;
