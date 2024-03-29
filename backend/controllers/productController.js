import asyncHandler from 'express-async-handler';
import paginate from '../utils/paginate.js';
import Product from '../models/productModel.js';
import FarmerProduct from '../models/farmerProductModel.js';
import Farmer from '../models/farmerModel.js';

// @desc Fetch products by keyword and page
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch all products
// @route   GET /api/products/all
// @access  Public
const getProductsAll = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc Fetch all farmers products by product
// @route GET /api/products/:id/farmers
// @access Public
const getFarmerProductsByProduct = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        farmName: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const farmerProducts = await FarmerProduct.find({
    product: req.params.id,
  })
    .populate({ path: 'farmer', match: { ...keyword } })
    .populate('product');

  const farmerProductsResult = farmerProducts.filter(function (farmerProduct) {
    return farmerProduct.farmer !== null;
  });

  if (farmerProductsResult.length > 0) {
    const paginateFarmerProductsResult = paginate(
      farmerProductsResult,
      pageSize,
      page
    );
    res.json({
      farmersByProduct: paginateFarmerProductsResult,
      page,
      pages: Math.ceil(farmerProductsResult.length / pageSize),
    });
  } else {
    res.status(404);
    throw new Error('Farmer Products not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    image: '/images/sample.jpg',
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, image } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.image = image;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductsAll,
  getProductById,
  getFarmerProductsByProduct,
  createProduct,
  updateProduct,
};
