import express from 'express';
const router = express.Router();
import {
  getShippingAddress,
  setShippingAddress,
} from '../controllers/shippingAddressController.js';
import { protect } from '../middleware/authMiddleware.js';

router
  .route('/:id')
  .get(protect, getShippingAddress)
  .post(protect, setShippingAddress);

export default router;
