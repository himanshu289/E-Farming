import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Rating from '../UI/Rating';

const FarmerReviewsList = ({ farmer }) => {
  return (
    <React.Fragment>
      {farmer.reviews.map((review) => (
        <ListGroup.Item key={review._id} className='p-4'>
          <strong>{review.name}</strong>
          <Rating value={review.rating} />
          <p>{review.createdAt.substring(0, 10)}</p>
          <p>{review.comment}</p>
        </ListGroup.Item>
      ))}
    </React.Fragment>
  );
};

export default FarmerReviewsList;
