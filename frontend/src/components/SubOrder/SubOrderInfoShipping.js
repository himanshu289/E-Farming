import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Message from '../UI/Message';

const SubOrderInfoShipping = ({ subOrder }) => {
  return (
    <ListGroup.Item>
      <h2>Shipping</h2>
      <p>
        <strong>Name: </strong> {subOrder.user.name}
      </p>
      <p>
        <strong>Email: </strong>{' '}
        <a href={`mailto:${subOrder.user.email}`}>{subOrder.user.email}</a>
      </p>
      <p>
        <strong>Address: </strong> {subOrder.shippingAddress.address},{' '}
        {subOrder.shippingAddress.city} {subOrder.shippingAddress.postalCode}
      </p>
      {subOrder.isDelivered ? (
        <Message variant='success'>
          Order was out for delivery on {subOrder.deliveredAt}
        </Message>
      ) : (
        <Message variant='danger'>Not Delivered</Message>
      )}
    </ListGroup.Item>
  );
};

export default SubOrderInfoShipping;
