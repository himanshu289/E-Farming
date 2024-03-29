import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/UI/Message';
import Loader from '../../components/UI/Loader';
import GoBack from '../../components/UI/GoBack';
import FormContainer from '../../components/UI/FormContainer';
import { Typeahead } from 'react-bootstrap-typeahead';
import {
  getProductsAll,
  productsAllActions,
} from '../../features/product/productsAllSlice';
import { getFarmerByUser } from '../../features/farmer/farmerByUserSlice';

import {
  farmerProductCreate,
  farmerProductCreateActions,
} from '../../features/farmerProduct/farmerProductCreateSlice';

const FarmerProductCreateScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productSelections, setProductSelections] = useState([]);
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  const [productTypeError, setProductTypeError] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const [countInStockError, setCountInStockError] = useState(null);

  const productsAllState = useSelector((state) => state.productsAll);
  const { loading, error, products } = productsAllState;

  const userState = useSelector((state) => state.user);
  const { userInfo } = userState;

  const farmerByUserState = useSelector((state) => state.farmerByUser);
  const { farmer } = farmerByUserState;

  const farmerProductCreateState = useSelector(
    (state) => state.farmerProductCreate
  );

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = farmerProductCreateState;

  useEffect(() => {
    dispatch(getProductsAll());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo && userInfo?.role === 'farmer') {
      dispatch(getFarmerByUser({ id: userInfo._id }));
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo]);

  useEffect(() => {
    dispatch(farmerProductCreateActions.clearFarmerProductCreateData());
    if (successCreate) {
      navigate(`/farmer/productlist`);
    }
  }, [dispatch, navigate, successCreate]);

  useEffect(() => {
    return () => {
      dispatch(productsAllActions.clearProductsData());
      dispatch(farmerProductCreateActions.clearFarmerProductCreateData());
    };
  }, [dispatch]);

  const productsOptions = products.map((product) => {
    return { id: product._id, productName: product.name };
  });

  const submitHandler = (e) => {
    e.preventDefault();

    if (productSelections.length === 0) {
      setProductTypeError('Must Select Product Type');
    }

    if (Number(price) <= 0) {
      setPriceError('Price must be a positive number');
    }

    if (Number(countInStock) <= 0) {
      setCountInStockError('Count in Stock must be a positive number');
    }

    if (
      productSelections.length > 0 &&
      Number(price) > 0 &&
      Number(countInStock) > 0
    ) {
      dispatch(
        farmerProductCreate({
          farmerId: farmer._id,
          productId: productSelections[0].id,
          price: Number(price),
          countInStock: Number(countInStock),
        })
      );
    }
  };

  return (
    <React.Fragment>
      <GoBack />
      <FormContainer>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {productTypeError && (
          <Message variant='danger'>{productTypeError}</Message>
        )}
        {priceError && <Message variant='danger'>{priceError}</Message>}

        {countInStockError && (
          <Message variant='danger'>{countInStockError}</Message>
        )}

        <h1>Create New Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className='mt-2'>
              <Form.Label>Select Product Type</Form.Label>
              <Typeahead
                id='basic-typeahead-single'
                labelKey='productName'
                onChange={setProductSelections}
                options={productsOptions}
                placeholder='Choose a product...'
                selected={productSelections}
              />
            </Form.Group>

            <Form.Group className='mt-2' controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mt-2' controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' className='mt-3 btn-green' variant='primary'>
              Create
            </Button>
          </Form>
        )}
      </FormContainer>
    </React.Fragment>
  );
};

export default FarmerProductCreateScreen;
