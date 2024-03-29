import express from 'express';
const router = express.Router();
import {
  getFarmerProducts,
  getFarmerProductById,
  createFarmerProduct,
  updateFarmerProduct,
} from '../controllers/farmerProductController.js';

import { protect, farmer } from '../middleware/authMiddleware.js';

router
  .route('/')
  .get(getFarmerProducts)
  .post(protect, farmer, createFarmerProduct);
router
  .route('/:id')
  .get(getFarmerProductById)
  .put(protect, farmer, updateFarmerProduct);

export default router;
