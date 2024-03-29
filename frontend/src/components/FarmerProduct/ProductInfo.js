import React from 'react';
import { Col, Image, ListGroup } from 'react-bootstrap';

const ProductInfo = ({ farmerProduct }) => {
  return (
    <Col md={3} className='rounded text-center'>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <Image
            src={farmerProduct.product.image}
            alt={farmerProduct.product.name}
            fluid
          />
        </ListGroup.Item>
      </ListGroup>
      <ListGroup.Item>{farmerProduct.product.name}</ListGroup.Item>
      <ListGroup.Item>Price: {farmerProduct.price}₪ / kg</ListGroup.Item>
    </Col>
  );
};

export default ProductInfo;
