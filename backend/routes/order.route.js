const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

/**
 * @route POST /api/order
 * @description Create a new order
 * @access Private
 */
router.post("/api/order", orderController.createOrder);

module.exports = router;
