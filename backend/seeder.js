import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import users from './data/users.js';
import products from './data/products.js';
import farmers from './data/farmers.js';
import farmerProducts from './data/farmer-products.js';

import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import SubOrder from './models/subOrderModel.js';
import Farmer from './models/farmerModel.js';
import FarmerProduct from './models/farmerProductModel.js';

import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Farmer.deleteMany();
    await FarmerProduct.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);
    const createdProducts = await Product.insertMany(products);

    const sampleFarmers = [
      { ...farmers[0], user: createdUsers[0]._id },
      { ...farmers[1], user: createdUsers[1]._id },
      { ...farmers[2], user: createdUsers[2]._id },
      { ...farmers[3], user: createdUsers[3]._id },
      { ...farmers[4], user: createdUsers[4]._id },
    ];

    const createdFarmers = await Farmer.insertMany(sampleFarmers);

    const sampleFarmerProducts = [
      {
        ...farmerProducts[0],
        farmer: createdFarmers[0]._id,
        product: createdProducts[0]._id,
      },
      {
        ...farmerProducts[1],
        farmer: createdFarmers[1]._id,
        product: createdProducts[0]._id,
      },
      {
        ...farmerProducts[2],
        farmer: createdFarmers[2]._id,
        product: createdProducts[0]._id,
      },
      {
        ...farmerProducts[3],
        farmer: createdFarmers[3]._id,
        product: createdProducts[0]._id,
      },
      {
        ...farmerProducts[4],
        farmer: createdFarmers[4]._id,
        product: createdProducts[0]._id,
      },
    ];

    await FarmerProduct.insertMany(sampleFarmerProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await SubOrder.deleteMany();

    await Product.deleteMany();
    await User.deleteMany();
    await Farmer.deleteMany();
    await FarmerProduct.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
