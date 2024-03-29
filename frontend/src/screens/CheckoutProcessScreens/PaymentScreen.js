import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/UI/FormContainer';
import CheckoutSteps from '../../components/UI/CheckoutSteps';
import { userSessionActions } from '../../features/userSession/userSessionSlice';

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const shippingAddressDetails = useSelector((state) => state.shippingAddress);
  const { loading, shippingAddressInfo } = shippingAddressDetails;

  useEffect(() => {
    if (
      !shippingAddressInfo.address &&
      !shippingAddressInfo.city &&
      !shippingAddressInfo.postalCode &&
      !loading
    ) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddressInfo, loading]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userSessionActions.savePaymentMethod({ paymentMethod }));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps activeStep={2} />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mt-2'>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            {/* <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
          </Col>
        </Form.Group>

        <Button className='mt-4 btn-green' type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
