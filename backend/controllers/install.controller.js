//  import the install serivce
const InstallService = require("../services/install.service");

// a function to handle the install request

async function install(req, res, next) {
  //  call the install service to install the application
  const ApplicationInstalled = await InstallService.installDatabase();
  if (ApplicationInstalled) {
    // send a success response back to the client
    const response = {
      message: ApplicationInstalled,
    };
    res.status(201).json(response);
  } else {
    // send a failure response back to the client
    const response = {
      status: "failure",
      message: "Table installation failed",
    };
    res.status(403).json(response);
  }
}

// Export the install function

module.exports = {
  install,
};
