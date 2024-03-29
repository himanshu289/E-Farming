import React from 'react';
import { Col, Image, ListGroup } from 'react-bootstrap';
import Rating from '../UI/Rating';

const FarmerInfo = ({ farmer }) => {
  return (
    <Col md={3} className='rounded text-center'>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <Image src={farmer.image} alt={farmer.farmName} fluid />
        </ListGroup.Item>
      </ListGroup>

      <ListGroup.Item>
        <strong>{farmer.farmName}</strong>
      </ListGroup.Item>

      <ListGroup.Item>
        <Rating value={farmer.rating} text={`${farmer.numReviews} reviews`} />
      </ListGroup.Item>
    </Col>
  );
};

export default FarmerInfo;
