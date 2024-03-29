import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import ShippingAddress from '../models/shippingAddressModel.js';

// @desc Get shipping address
// @route GET /api/shipping-address/:id
// @access Private
const getShippingAddress = asyncHandler(async (req, res) => {
  const shippingAddress = await ShippingAddress.findOne({
    user: req.params.id,
  });
  res.json(shippingAddress);
});

// @desc Set shipping address
// @route POST /api/shipping-address/:id
// @access Private
const setShippingAddress = asyncHandler(async (req, res) => {
  const { city, address, postalCode } = req.body;
  const query = { user: req.params.id };
  const update = { user: req.params.id, city, address, postalCode };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  const updatedShippingAddress = await ShippingAddress.findOneAndUpdate(
    query,
    update,
    options
  );

  if (updatedShippingAddress) {
    res.status(200).json(updatedShippingAddress);
  } else {
    res.status(400);
    throw new Error('Shipping Address update failed');
  }
});

export { getShippingAddress, setShippingAddress };
