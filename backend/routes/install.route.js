// import express module
const express = require("express");
// import the router module
const router = express.Router();
// import the install  controller
const installController = require("../controllers/install.controller");

// pass the install request to the install controller and call the install function in it
router.get("/install", installController.install);

// exprot the router
module.exports = router;
