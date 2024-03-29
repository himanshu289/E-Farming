import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/UI/Message';
import FormContainer from '../../components/UI/FormContainer';
import CheckoutSteps from '../../components/UI/CheckoutSteps';
import {
  orderCreateActions,
  orderCreate,
} from '../../features/order/orderCreateSlice';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const shippingAddressDetails = useSelector((state) => state.shippingAddress);
  const { loading, shippingAddressInfo } = shippingAddressDetails;

  const userSessionState = useSelector((state) => state.userSession);
  const { paymentMethod } = userSessionState;

  useEffect(() => {
    if (
      !shippingAddressInfo.address &&
      !shippingAddressInfo.city &&
      !shippingAddressInfo.postalCode &&
      !loading &&
      !paymentMethod
    ) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddressInfo, paymentMethod, loading]);

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const cartTotalPrice = Number(
    addDecimals(
      cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  ).toFixed(2);

  const orderCreateState = useSelector((state) => state.orderCreate);
  const { order, success } = orderCreateState;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch(orderCreateActions.clearOrderCreateData());
    }
    // eslint-disable-next-line
  }, [navigate, success]);

  const placeOrderHandler = () => {
    dispatch(
      orderCreate({
        order: {
          orderItems: cartItems,
          shippingAddress: shippingAddressInfo,
          paymentMethod: paymentMethod,
          totalPrice: cartTotalPrice,
        },
      })
    );
  };

  return (
    <React.Fragment>
      <FormContainer>
        <CheckoutSteps activeStep={3} />
      </FormContainer>
      <Row className='my-4'>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {shippingAddressInfo.address},{' '}
                {shippingAddressInfo.city} {shippingAddressInfo.postalCode}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col className='m-auto' md={2}>
                          <Image
                            className='farmer-img-cart-item'
                            src={item.farmerImage}
                            alt={item.farmerName}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col className='m-auto' md={2}>
                          <Image
                            src={item.productImage}
                            alt={item.productName}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col className='m-auto' md={2}>
                          <Link to={`/farmer-product/${item.farmerProduct}`}>
                            {item.farmerName}
                          </Link>
                        </Col>

                        <Col className='m-auto' md={2}>
                          <Link to={`/farmer-product/${item.farmerProduct}`}>
                            {item.productName}
                          </Link>
                        </Col>

                        <Col className='m-auto' md={4}>
                          {item.qty} x {item.price}₪ ={' '}
                          {Number(item.qty * item.price).toFixed(2)}₪
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item className='m-auto'>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row className='d-flex justify-content-between text-center'>
                  <Col>Total</Col>
                  <Col>{cartTotalPrice}₪</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block btn-green'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PlaceOrderScreen;
