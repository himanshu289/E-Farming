import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const ProductByFarmer = ({ productByFarmer }) => {
  return (
    <Card className='my-3 p-3 rounded text-center'>
      <Link to={`/farmer-product/${productByFarmer._id}`}>
        <Card.Img
          className='farmer-img'
          src={productByFarmer.product.image}
          variant='top'
        />
      </Link>
      <Card.Body>
        <Link to={`/farmer-product/${productByFarmer._id}`}>
          <Card.Title as='div'>
            <strong>{productByFarmer.product.name}</strong>
          </Card.Title>
        </Link>
      </Card.Body>
      <Card.Text as='h3'>{productByFarmer.price}₪/kg</Card.Text>
    </Card>
  );
};

export default ProductByFarmer;
