import asyncHandler from 'express-async-handler';
import paginate from '../utils/paginate.js';
import Product from '../models/productModel.js';
import FarmerProduct from '../models/farmerProductModel.js';
import Farmer from '../models/farmerModel.js';

// @desc Fetch all farmers
// @route GET /api/farmers
// @access Public
const getFarmers = asyncHandler(async (req, res) => {
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
  const count = await Farmer.countDocuments({ ...keyword });
  const farmers = await Farmer.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ farmers, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch single farmer by id
// @route GET /api/farmers/:id
// @access Public
const getFarmer = asyncHandler(async (req, res) => {
  const farmer = await Farmer.findById(req.params.id);
  if (farmer) {
    res.json(farmer);
  } else {
    res.status(404);
    throw new Error('Farmer not found');
  }
});

// @desc Fetch single farmer by user id
// @route GET /api/farmers/user/:id
// @access Private/Farmer
const getFarmerByUserId = asyncHandler(async (req, res) => {
  const farmer = await Farmer.findOne({ user: req.params.id });
  if (farmer) {
    res.json(farmer);
  } else {
    res.status(404);
    throw new Error('Farmer not found');
  }
});

// @desc Fetch all farmers products by farmer
// @route GET /api/farmers/:id/products
// @access Public
const getFarmerProductsByFarmer = asyncHandler(async (req, res) => {
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

  const farmerProducts = await FarmerProduct.find({ farmer: req.params.id })
    .populate('farmer')
    .populate({ path: 'product', match: { ...keyword } });

  const farmerProductsResult = farmerProducts.filter(function (farmerProduct) {
    return farmerProduct.product !== null;
  });

  if (farmerProductsResult.length > 0) {
    const paginateFarmerProductsResult = paginate(
      farmerProductsResult,
      pageSize,
      page
    );
    res.json({
      productsByFarmer: paginateFarmerProductsResult,
      page,
      pages: Math.ceil(farmerProductsResult.length / pageSize),
    });
  } else {
    res.status(404);
    throw new Error('Farmer Products not found');
  }
});

// @desc    Create new review
// @route   PUT /api/farmers/:id/reviews
// @access  Private
const createFarmerReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const farmer = await Farmer.findById(req.params.id);

  if (farmer) {
    const alreadyReviewed = farmer.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Farmer already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    farmer.reviews.push(review);

    farmer.numReviews = farmer.reviews.length;

    farmer.rating =
      farmer.reviews.reduce((acc, item) => item.rating + acc, 0) /
      farmer.reviews.length;

    await farmer.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Farmer not found');
  }
});

export {
  getFarmers,
  getFarmer,
  getFarmerByUserId,
  getFarmerProductsByFarmer,
  createFarmerReview,
};
