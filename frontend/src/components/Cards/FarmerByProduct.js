import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from '../UI/Rating';

const FarmerByProduct = ({ farmerByProduct }) => {
  return (
    <Card className='my-3 p-3 rounded text-center'>
      <Link to={`/farmer-product/${farmerByProduct._id}`}>
        <Card.Img
          className='farmer-img'
          src={farmerByProduct.farmer.image}
          variant='top'
        />
      </Link>
      <Card.Body>
        <Link to={`/farmer-product/${farmerByProduct._id}`}>
          <Card.Title as='div'>
            <strong>{farmerByProduct.farmer.farmName}</strong>
          </Card.Title>
        </Link>
      </Card.Body>
      <Card.Text as='div'>
        <Link to={`/farmer/${farmerByProduct.farmer._id}`}>
          <Rating
            value={farmerByProduct.farmer.rating}
            text={`${farmerByProduct.farmer.numReviews} reviews`}
          />
        </Link>
      </Card.Text>
      <Card.Text as='h3'>{farmerByProduct.price}₪/kg</Card.Text>
    </Card>
  );
};

export default FarmerByProduct;
