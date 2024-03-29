import React from 'react';
import { Row } from 'react-bootstrap';
import CartItems from './CartItems';
import CartSummary from './CartSummary';

const Cart = ({ cartItems }) => {
  return (
    <React.Fragment>
      <h1
        style={{
          'text-align': 'center',
        }}
      >
        Shopping Cart
      </h1>
      <Row>
        <CartItems cartItems={cartItems} />
        <CartSummary cartItems={cartItems} />
      </Row>
    </React.Fragment>
  );
};

export default Cart;
