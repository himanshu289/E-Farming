import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../../components/UI/CheckoutSteps';
import FormContainer from '../../components/UI/FormContainer';
import Message from '../../components/UI/Message';
import Loader from '../../components/UI/Loader';
import {
  getShippingAddress,
  setShippingAddress,
} from '../../features/shippingAddress/shippingAddressSlice';

const ShippingScreen = () => {
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [postalCode, setPostalCode] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const shippingAddressDetails = useSelector((state) => state.shippingAddress);
  const { error, success, loading, shippingAddressInfo } =
    shippingAddressDetails;

  useEffect(() => {
    if (success) {
      setAddress(shippingAddressInfo?.address);
      setCity(shippingAddressInfo?.city);
      setPostalCode(shippingAddressInfo?.postalCode);
    }
  }, [shippingAddressInfo, success]);

  useEffect(() => {
    if (userInfo) {
      dispatch(getShippingAddress());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setShippingAddress({ address, city, postalCode }));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps activeStep={1} />
      <h1>Shipping</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group className='mt-2' controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter address'
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className='mt-2' controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter city'
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className='mt-2' controlId='postalCode'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter postal code'
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button className='mt-3 btn-green' type='submit' variant='primary'>
            Continue
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default ShippingScreen;
