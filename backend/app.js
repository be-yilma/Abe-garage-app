//  import the express module
const express = require("express");
// import the cors package
const cors = require("cors");
// import the dotenv module and call the config method
require("dotenv").config();
// Import the sanitize module
const sanitize = require("sanitize");

// set up the cors options to allow requests from our front-end
const corsOptions = {
  origin: process.env.Frontend_URL,
  optionsSuccessStatus: 200,
};
// create web server
const app = express();
// add the cors middleware to the middleware chain
app.use(cors(corsOptions));
// middleware to parse the request body
app.use(express.json());
// Add the sanitizer to the express middleware
app.use(sanitize.middleware);
//  import the routes
const router = require("./routes");
app.use(router);

const port = process.env.PORT;

// start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// export the webserver
module.exports = app;
