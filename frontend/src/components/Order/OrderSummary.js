import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Card } from 'react-bootstrap';
import Message from '../UI/Message';
import Loader from '../UI/Loader';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { getOrderDetails } from '../../features/order/orderDetailsSlice';
import { orderPayActions, payOrder } from '../../features/order/orderPaySlice';

const OrderSummary = ({ order }) => {
  const dispatch = useDispatch();
  const { id: orderId } = useParams();
  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer();

  const orderPay = useSelector((state) => state.orderPay);
  const { loading, success } = orderPay;

  //useEffect becomes shorter
  useEffect(() => {
    if (success) {
      dispatch(orderPayActions.orderPayReset());
      dispatch(getOrderDetails({ orderId }));
    }
  }, [dispatch, orderId, success]);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: { value: order.totalPrice },
        },
      ],
    });
  };

  const successPaymentHandler = (data, actions) => {
    return actions.order.capture().then((paymentResult) => {
      dispatch(payOrder({ orderId, paymentResult }));
    });
  };

  return (
    <Col md={4}>
      <Card>
        <ListGroup variant='flush'>
          <ListGroup.Item className='m-auto'>
            <h2>Order Summary</h2>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col>Total</Col>
              <Col>{order.totalPrice}₪</Col>
            </Row>
          </ListGroup.Item>

          {!order.isPaid && (
            <ListGroup.Item>
              {loading && <Loader />}
              {isPending && <Loader />}
              {isRejected && <Message variant='danger'>SDK load error</Message>}
              {isResolved && (
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={successPaymentHandler}
                />
              )}
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </Col>
  );
};

export default OrderSummary;
