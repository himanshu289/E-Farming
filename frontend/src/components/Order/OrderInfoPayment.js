import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Message from '../UI/Message';

const OrderInfoPayment = ({ order }) => {
  return (
    <ListGroup.Item>
      <h2>Payment Method</h2>
      <p>
        <strong>Method: </strong>
        {order.paymentMethod}
      </p>
      {order.isPaid ? (
        <Message variant='success'>Paid on {order.paidAt}</Message>
      ) : (
        <Message variant='danger'>Not Paid</Message>
      )}
    </ListGroup.Item>
  );
};

export default OrderInfoPayment;
