//  import the express module
const express = require("express");
// import the cors package
const cors = require("cors");
// import the dotenv module and call the config method
require("dotenv").config();
// create web server
const app = express();
// add the cors middleware to the middleware chain
app.use(cors());
// middleware to parse the request body
app.use(express.json());
//  import the routes
const routes = require("./routes");
app.use(routes);

const port = process.env.PORT;

// start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// export the webserver
module.exports = app;
