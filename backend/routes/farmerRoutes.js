import express from 'express';
const router = express.Router();
import {
  getFarmers,
  getFarmer,
  getFarmerByUserId,
  getFarmerProductsByFarmer,
  createFarmerReview,
} from '../controllers/farmerController.js';

import { protect, farmer } from '../middleware/authMiddleware.js';

router.route('/').get(getFarmers);
router.route('/:id/reviews').put(protect, createFarmerReview);
router.route('/:id').get(getFarmer);
router.route('/user/:id').get(protect, farmer, getFarmerByUserId);
router.route('/:id/products').get(getFarmerProductsByFarmer);

export default router;
