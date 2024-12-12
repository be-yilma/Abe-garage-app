const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

/**
 * @route POST /api/order
 * @description Create a new order
 * @access Private
 */
router.post("/api/order", orderController.createOrder);

/**
 * @route GET /api/orders
 * @description Retrieves all orders
 * @access Private
 */
router.get("/api/orders", orderController.getAllOrders);

module.exports = router;
