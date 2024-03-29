import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, ListGroup, Button, Card } from 'react-bootstrap';

const CartSummary = ({ cartItems }) => {
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Col md={12} xl={4}>
      <Card>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2
              style={{
                'text-align': 'center',
              }}
            >
              Subtotal (
              {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
              items
            </h2>
            <div
              style={{
                'text-align': 'center',
              }}
            >
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
              ₪
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type='button'
              className='btn-block btn-green'
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
};

export default CartSummary;
