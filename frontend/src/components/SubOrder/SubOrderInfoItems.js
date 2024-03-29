import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image } from 'react-bootstrap';
import Message from '../UI/Message';

const SubOrderInfoItems = ({ subOrder }) => {
  return (
    <ListGroup.Item>
      <h2>Order Items</h2>
      {subOrder.orderItems.length === 0 ? (
        <Message>SubOrder is empty</Message>
      ) : (
        <ListGroup variant='flush'>
          {subOrder.orderItems.map((item, index) => (
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
  );
};

export default SubOrderInfoItems;
