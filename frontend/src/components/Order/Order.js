import React from 'react';
import OrderInfo from './OrderInfo';
import OrderSummary from './OrderSummary';

import { Row } from 'react-bootstrap';

const Order = ({ order }) => {
  return (
    <React.Fragment>
      <h1>Order {order._id}</h1>
      <Row>
        <OrderInfo order={order} />
        <OrderSummary order={order} />
      </Row>
    </React.Fragment>
  );
};

export default Order;
