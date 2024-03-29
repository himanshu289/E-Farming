import React from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import Message from '../../components/UI/Message';
import FarmerReviewsList from './FarmerReviewsList';
import NewFarmerReview from './NewFarmerReview';

const FarmerReviews = ({ farmer }) => {
  return (
    <Col md={9} className=''>
      <h2>Reviews</h2>
      {farmer.reviews.length === 0 && <Message>No Reviews</Message>}
      <ListGroup variant='flush'>
        <FarmerReviewsList farmer={farmer} />
        <NewFarmerReview />
      </ListGroup>
    </Col>
  );
};

export default FarmerReviews;
