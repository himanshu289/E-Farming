import express from 'express';
const router = express.Router();
import {
  createOrder,
  getOrderById,
  getSubOrderById,
  updateOrderToPaid,
  updateSubOrderToDelivered,
  getMyOrders,
  getSubOrdersByFarmer,
} from '../controllers/orderController.js';
import { protect, farmer } from '../middleware/authMiddleware.js';
import { orderToSubOrders } from '../middleware/orderMiddleware.js';

router.route('/').post(protect, orderToSubOrders, createOrder);
router.route('/myorders').get(protect, getMyOrders);
router.route('/suborders/:farmerId').get(protect, farmer, getSubOrdersByFarmer);
router
  .route('/suborder/:subOrderId/deliver')
  .put(protect, farmer, updateSubOrderToDelivered);

router.route('/:id').get(protect, getOrderById);
router.route('/:id/suborder/:subOrderId').get(protect, getSubOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
