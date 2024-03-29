import React from 'react';
import { Link } from 'react-router-dom';
import { Col, ListGroup } from 'react-bootstrap';
import CartItem from './CartItem';
import Message from '../UI/Message';

const CartItems = ({ cartItems }) => {
  return (
    <Col xs={12} md={12} xl={8}>
      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty <Link to='/'>Go Back</Link>
        </Message>
      ) : (
        <ListGroup variant='flush'>
          {cartItems.map((item) => (
            <CartItem key={item.farmerProduct} item={item} />
          ))}
        </ListGroup>
      )}
    </Col>
  );
};

export default CartItems;
