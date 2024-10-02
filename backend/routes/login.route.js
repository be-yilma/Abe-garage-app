    // import express module
    const express = require("express");
    // import the router module
    const router = express.Router();

    // import the login controller
    const loginController = require("../controllers/login.controller");

    // Create a route to handle the login request
    router.post("/api/employee/login", loginController.logIn);

    // exprot the router
    module.exports = router;
