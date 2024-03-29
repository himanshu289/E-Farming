import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ListGroup, Button, Form } from 'react-bootstrap';
import Message from '../../components/UI/Message';
import Loader from '../../components/UI/Loader';
import {
  farmerReviewCreate,
  farmerReviewCreateActions,
} from '../../features/farmer/farmerReviewCreateSlice';
import { getFarmer } from '../../features/farmer/farmerSlice';

const NewFarmerReview = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const userState = useSelector((state) => state.user);
  const { userInfo } = userState;

  const farmerReviewCreateState = useSelector(
    (state) => state.farmerReviewCreate
  );

  const { success, loading, error, farmer } = farmerReviewCreateState;

  useEffect(() => {
    if (success) {
      setRating(0);
      setComment('');
      dispatch(farmerReviewCreateActions.clearFarmerReviewCreateData());
      dispatch(getFarmer({ id }));
    }
  }, [dispatch, success, id, farmer]);

  useEffect(() => {
    return () => {
      dispatch(farmerReviewCreateActions.clearFarmerReviewCreateData());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    const farmerId = id;
    e.preventDefault();
    const review = {
      rating,
      comment,
    };
    dispatch(farmerReviewCreate({ farmerId, review }));
  };

  return (
    <ListGroup.Item>
      <h2>Write a Customer Review</h2>
      {success && (
        <Message variant='success'>Review submitted successfully</Message>
      )}
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {userInfo && (
        <Form onSubmit={submitHandler}>
          <Form.Group className='mt-2' controlId='rating'>
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as='select'
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value=''>Select...</option>
              <option value='1'>1 - Poor</option>
              <option value='2'>2 - Fair</option>
              <option value='3'>3 - Good</option>
              <option value='4'>4 - Very Good</option>
              <option value='5'>5 - Excellent</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className='mt-2' controlId='comment'>
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as='textarea'
              row='3'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            className='mt-3 btn-green'
            disabled={loading}
            type='submit'
            variant='primary'
          >
            Submit
          </Button>
        </Form>
      )}
      {!userInfo && (
        <Message>
          Please <Link to='/login'>sign in</Link> to write a review{' '}
        </Message>
      )}
    </ListGroup.Item>
  );
};

export default NewFarmerReview;
