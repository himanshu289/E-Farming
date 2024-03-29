import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import SubOrder from '../models/subOrderModel.js';
import FarmerProduct from '../models/farmerProductModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const createdSubOrders = await SubOrder.insertMany(req.subOrders);
    const createdOrder = await Order.create({
      user: req.user._id,
      shippingAddress,
      subOrders: createdSubOrders.map((subOrder) => subOrder._id),
      paymentMethod,
      totalPrice,
    });

    orderItems.forEach(async (orderItem) => {
      const farmerProduct = await FarmerProduct.findById(
        orderItem.farmerProduct
      );
      farmerProduct.countInStock =
        farmerProduct.countInStock - Number(orderItem.qty);
      await farmerProduct.save();
    });

    createdSubOrders.forEach(async (subOrder) => {
      subOrder.order = createdOrder._id;
      await subOrder.save();
    });
    return res.status(201).json(createdOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email')
    .populate('subOrders');

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get sub order by ID
// @route   GET /api/orders/:id/suborder/:subOrderId
// @access  Private
const getSubOrderById = asyncHandler(async (req, res) => {
  const subOrder = await SubOrder.findById(req.params.subOrderId).populate(
    'user',
    'name email'
  );
  if (subOrder) {
    res.json(subOrder);
  } else {
    res.status(404);
    throw new Error('SubOrder not found');
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.subOrders.forEach(async (subOrderId) => {
      const subOrder = await SubOrder.findById(subOrderId);
      subOrder.isPaid = true;
      subOrder.paidAt = Date.now();
      await subOrder.save();
    });

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update subOrder to out for delivery
// @route   PUT /api/orders/suborder/:subOrderId/deliver
// @access  Private/Farmer
const updateSubOrderToDelivered = asyncHandler(async (req, res) => {
  const subOrder = await SubOrder.findById(req.params.subOrderId);
  if (subOrder) {
    subOrder.isDelivered = true;
    subOrder.deliveredAt = Date.now();
    const updatedSubOrder = await subOrder.save();
    res.json(updatedSubOrder);
  } else {
    res.status(404);
    throw new Error('Sub Order not found');
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @route   GET /api/orders/suborders/:farmerId
// @access  Private/Farmer
const getSubOrdersByFarmer = asyncHandler(async (req, res) => {
  const subOrders = await SubOrder.find({
    farmer: req.params.farmerId,
  }).populate('user', 'id name');
  res.json(subOrders);
});

export {
  createOrder,
  getOrderById,
  getSubOrderById,
  updateOrderToPaid,
  updateSubOrderToDelivered,
  getMyOrders,
  getSubOrdersByFarmer,
};
