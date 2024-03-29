import React from 'react';
import { Col, Image, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Rating from '../UI/Rating';

const FarmerInfo = ({ farmerProduct }) => {
  return (
    <Col md={3} className='rounded text-center'>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <Image
            src={farmerProduct.farmer.image}
            alt={farmerProduct.farmer.farmName}
            fluid
          />
        </ListGroup.Item>
      </ListGroup>

      <ListGroup.Item>
        <Link to={`/farmer/${farmerProduct.farmer._id}`}>
          <strong>{farmerProduct.farmer.farmName}</strong>
        </Link>
      </ListGroup.Item>

      <ListGroup.Item>
        <Link to={`/farmer/${farmerProduct.farmer._id}`}>
          <Rating
            value={farmerProduct.farmer.rating}
            text={`${farmerProduct.farmer.numReviews} reviews`}
          />
        </Link>
      </ListGroup.Item>
    </Col>
  );
};

export default FarmerInfo;
