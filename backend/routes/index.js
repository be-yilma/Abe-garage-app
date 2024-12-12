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

// import the customer routes
const customerRoute = require("./customer.route");
// add the customer routes to the middleware chain
router.use(customerRoute);

// import the service routes
const serviceRoute = require("./service.route");
// add the service routes to the middleware chain
router.use(serviceRoute);

// import vehicle routes
const vehicleRoute = require("./vehicle.route");
// add the vehicle routes to the middleware chain
router.use(vehicleRoute);

// import the order routes
const orderRoute = require("./order.route");
// add the order routes to the middleware chain
router.use(orderRoute);

// export the router
module.exports = router;
