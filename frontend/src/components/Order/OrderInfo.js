import React from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import OrderInfoShipping from './OrderInfoShipping';
import OrderInfoPayment from './OrderInfoPayment';
import SubOrdersList from './SubOrdersList';

const OrderInfo = ({ order }) => {
  return (
    <Col md={8}>
      <ListGroup variant='flush'>
        <OrderInfoShipping order={order} />
        <OrderInfoPayment order={order} />
        <SubOrdersList order={order} />
      </ListGroup>
    </Col>
  );
};

export default OrderInfo;
