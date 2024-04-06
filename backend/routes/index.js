// collect every routes in there and export them to use in the app.js file

//  import the express module
const express = require("express");
// import the router module
const router = express.Router();

//  import the install route
const installRoute = require("./install.route");
//  add the login router to the middleware chain
router.use(installRoute);
// export the router
module.exports = router;
