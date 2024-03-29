import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

import CustomerHomeScreen from './screens/ShoppingProcessScreens/CustomerHomeScreen';
import FarmersScreen from './screens/ShoppingProcessScreens/FarmersScreen';
import FarmersByProductScreen from './screens/ShoppingProcessScreens/FarmersByProductScreen';
import ProductsByFarmerScreen from './screens/ShoppingProcessScreens/ProductsByFarmerScreen';
import FarmerProductScreen from './screens/ShoppingProcessScreens/FarmerProductScreen';
import FarmerScreen from './screens/ShoppingProcessScreens/FarmerScreen';

import CartScreen from './screens/CartScreens/CartScreen';

import LoginScreen from './screens/UserScreens/LoginScreen';
import CustomerRegisterScreen from './screens/UserScreens/CustomerRegisterScreen';
import FarmerRegisterScreen from './screens/UserScreens/FarmerRegisterScreen';
import ProfileScreen from './screens/UserScreens/ProfileScreen';
import UserOrdersScreen from './screens/UserScreens/UserOrdersScreen';

import ShippingScreen from './screens/CheckoutProcessScreens/ShippingScreen';
import PaymentScreen from './screens/CheckoutProcessScreens/PaymentScreen';
import PlaceOrderScreen from './screens/CheckoutProcessScreens/PlaceOrderScreen';
import OrderScreen from './screens/CheckoutProcessScreens/OrderScreen';
import SubOrderScreen from './screens/CheckoutProcessScreens/SubOrderScreen';

import FarmerProductListScreen from './screens/FarmerUserScreens/FarmerProductListScreen';
import FarmerProductCreateScreen from './screens/FarmerUserScreens/FarmerProductCreateScreen';
import FarmerProductEditScreen from './screens/FarmerUserScreens/FarmerProductEditScreen';
import FarmerOrderListScreen from './screens/FarmerUserScreens/FarmerOrderListScreen';

import AdminProductListScreen from './screens/AdminScreens/AdminProductListScreen';
import ProductEditScreen from './screens/AdminScreens/ProductEditScreen';

const App = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const [clientID, setClientID] = useState('');
  useEffect(() => {
    // const getClientId = async () => {
    //   const { data: clientId } = await axios.get('/api/config/paypal');
    //   setClientID(clientId);
    // };

    // if (!window.paypal) {
    //   getClientId();
    // }
  }, []);
  return (
    <React.Fragment>
     
        <Router>
          <Header />
          <main className='py-3'>
            <Container>
              <Routes>
                {(userInfo?.role === 'customer' || !userInfo) && (
                  <Route path='/' element={<CustomerHomeScreen />} excat />
                )}
                <Route
                  path='/search/:keyword'
                  element={<CustomerHomeScreen />}
                />

                {userInfo && userInfo?.role === 'farmer' && (
                  <Route
                    path='/'
                    element={<FarmerProductListScreen />}
                    excat
                  />
                )}

                {userInfo && userInfo?.role === 'admin' && (
                  <Route
                    path='/'
                    element={<AdminProductListScreen />}
                    excat
                  />
                )}
                {userInfo && userInfo?.role === 'admin' && (
                  <Route
                    path='/page/:pageNumber'
                    element={<AdminProductListScreen />}
                    excat
                  />
                )}
                <Route
                  path='/products'
                  element={<CustomerHomeScreen />}
                  excat
                />
                <Route
                  path='/products/search/:keyword'
                  element={<CustomerHomeScreen />}
                />

                <Route
                  path='/page/:pageNumber'
                  element={<CustomerHomeScreen />}
                  exact
                />
                <Route
                  path='/search/:keyword/page/:pageNumber'
                  element={<CustomerHomeScreen />}
                  exact
                />

                <Route
                  path='/products/page/:pageNumber'
                  element={<CustomerHomeScreen />}
                  exact
                />
                <Route
                  path='/products/search/:keyword/page/:pageNumber'
                  element={<CustomerHomeScreen />}
                  exact
                />

                <Route path='/farmers' element={<FarmersScreen />} excat />
                <Route
                  path='/farmers/search/:keyword'
                  element={<FarmersScreen />}
                />

                <Route
                  path='/farmers/page/:pageNumber'
                  element={<FarmersScreen />}
                  exact
                />
                <Route
                  path='/farmers/search/:keyword/page/:pageNumber'
                  element={<FarmersScreen />}
                  exact
                />

                <Route
                  path='/product/:id/farmers'
                  element={<FarmersByProductScreen />}
                />
                <Route
                  path='/product/:id/farmers/search/:keyword'
                  element={<FarmersByProductScreen />}
                />

                <Route
                  path='/product/:id/farmers/page/:pageNumber'
                  element={<FarmersByProductScreen />}
                  exact
                />
                <Route
                  path='/product/:id/farmers/search/:keyword/page/:pageNumber'
                  element={<FarmersByProductScreen />}
                  exact
                />

                <Route
                  path='/farmer/:id/products'
                  element={<ProductsByFarmerScreen />}
                />
                <Route
                  path='/farmer/:id/products/search/:keyword'
                  element={<ProductsByFarmerScreen />}
                />

                <Route
                  path='/farmer/:id/products/page/:pageNumber'
                  element={<ProductsByFarmerScreen />}
                  exact
                />
                <Route
                  path='/farmer/:id/products/search/:keyword/page/:pageNumber'
                  element={<ProductsByFarmerScreen />}
                  exact
                />

                <Route
                  path='/farmer-product/:id'
                  element={<FarmerProductScreen />}
                />

                <Route path='/farmer/:id' element={<FarmerScreen />} />

                <Route path='/cart/' element={<CartScreen />} />
                <Route path='/cart/:id' element={<CartScreen />} />
                <Route path='/login' element={<LoginScreen />} />
                <Route
                  path='/register/customer'
                  element={<CustomerRegisterScreen />}
                />
                <Route
                  path='/register/farmer'
                  element={<FarmerRegisterScreen />}
                />
                <Route path='/profile' element={<ProfileScreen />} />
                <Route path='/myorders' element={<UserOrdersScreen />} />
                <Route path='/shipping' element={<ShippingScreen />} />
                <Route path='/payment' element={<PaymentScreen />} />
                <Route path='/placeorder' element={<PlaceOrderScreen />} />
                <Route path='/order/:id' element={<OrderScreen />} />
                <Route
                  path='/order/:id/suborder/:subOrderId'
                  element={<SubOrderScreen />}
                />
                <Route
                  path='/farmer/productlist'
                  element={<FarmerProductListScreen />}
                />

                <Route
                  path='/farmer/farmerproduct/create'
                  element={<FarmerProductCreateScreen />}
                />

                <Route
                  path='/farmer/farmerproduct/:id/edit'
                  element={<FarmerProductEditScreen />}
                />

                <Route
                  path='/farmer/orderlist'
                  element={<FarmerOrderListScreen />}
                />

                <Route
                  path='/admin/productlist'
                  element={<AdminProductListScreen />}
                />
                <Route
                  path='/admin/productlist/page/:pageNumber'
                  element={<AdminProductListScreen />}
                />
                <Route
                  path='/admin/product/:id/edit'
                  element={<ProductEditScreen />}
                />
              </Routes>
            </Container>
          </main>
          <Footer />
        </Router>
    </React.Fragment>
  );
};

export default App;
