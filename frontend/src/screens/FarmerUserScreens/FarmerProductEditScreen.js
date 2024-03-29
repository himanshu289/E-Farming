import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/UI/Message';
import Loader from '../../components/UI/Loader';
import GoBack from '../../components/UI/GoBack';
import FormContainer from '../../components/UI/FormContainer';
import {
  getFarmerProductDetails,
  farmerProductDetailsActions,
} from '../../features/farmerProduct/farmerProductDetailsSlice';

import {
  farmerProductUpdate,
  farmerProductUpdateActions,
} from '../../features/farmerProduct/farmerProductUpdateSlice';

const FarmerProductEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  const [priceError, setPriceError] = useState(null);
  const [countInStockError, setCountInStockError] = useState(null);

  const farmerProductDetailsState = useSelector((state) => state.farmerProduct);
  const { loading, error, farmerProduct } = farmerProductDetailsState;

  const farmerProductUpdateState = useSelector(
    (state) => state.farmerProductUpdate
  );

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = farmerProductUpdateState;

  useEffect(() => {
    if (successUpdate) {
      navigate('/farmer/productlist');
    } else {
      if (farmerProduct?._id !== id) {
        dispatch(getFarmerProductDetails({ id }));
      } else {
        setPrice(farmerProduct.price);
        setCountInStock(farmerProduct.countInStock);
      }
    }
  }, [dispatch, navigate, farmerProduct, id, successUpdate]);

  useEffect(() => {
    return () => {
      dispatch(farmerProductDetailsActions.clearFarmerProductDetailsData());
      dispatch(farmerProductUpdateActions.clearFarmerProductUpdateData());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (Number(price) <= 0) {
      setPriceError('Price must be a positive number');
    }

    if (Number(countInStock) <= 0) {
      setCountInStockError('Count in Stock must be a positive number');
    }

    if (Number(price) > 0 && Number(countInStock) > 0) {
      dispatch(
        farmerProductUpdate({
          id,
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
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {priceError && <Message variant='danger'>{priceError}</Message>}

        {countInStockError && (
          <Message variant='danger'>{countInStockError}</Message>
        )}

        <h1>Update Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
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
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </React.Fragment>
  );
};

export default FarmerProductEditScreen;
