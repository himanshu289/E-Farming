import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductsAll,
  getProductById,
  getFarmerProductsByProduct,
  createProduct,
  updateProduct,
} from '../controllers/productController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/all').get(getProductsAll);
router.route('/:id').get(getProductById).put(protect, admin, updateProduct);
router.route('/:id/farmers').get(getFarmerProductsByProduct);

export default router;
