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

/**
 * @route GET /api/order/:id
 * @description Retrieve details of a specific order by its ID
 * @access Private
 */
router.get("/api/order/:id", orderController.getOrderById);

/**
 * @route PUT /api/order/:id
 * @description Updates an existing order
 * @access Private
 */
router.put("/api/order/:id", orderController.updateOrder);

module.exports = router;
