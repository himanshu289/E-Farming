import React from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded text-center'>
      <Link to={`/product/${product._id}/farmers`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}/farmers`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Product;
