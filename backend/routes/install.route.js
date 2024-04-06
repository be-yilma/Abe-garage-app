// import express module
const express = require("express");
// import the router module
const router = express.Router();
// import the employee  controller
const installController = require("../controllers/install.controller");

// pass the employee request to the employee controller and call the employee function in it
router.get("/install", installController.install);

// exprot the router
module.exports = router;
