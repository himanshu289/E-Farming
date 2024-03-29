import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/UI/Message';
import Loader from '../../components/UI/Loader';
import FormContainer from '../../components/UI/FormContainer';
import { userActions } from '../../features/user/userSlice';
import { registerFarmer } from '../../features/user/userSlice';

const FarmerRegisterScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [farmName, setFarmName] = useState('');

  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;

  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  useEffect(() => {
    return () => dispatch(userActions.clearUserData());
  }, [dispatch]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(registerFarmer({ name, email, password, farmName, image }));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up - New Farmer</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group className='mt-2' controlId='name'>
          <Form.Label>Farmer Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mt-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mt-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mt-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mt-2' controlId='farmName'>
          <Form.Label>Farm Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Farm Name'
            value={farmName}
            onChange={(e) => setFarmName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mt-2' controlId='image'>
          <Form.Label>Image</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter image url'
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></Form.Control>
          <Form.Control
            type='file'
            id='image-file'
            label='Choose file'
            custom
            onChange={uploadFileHandler}
          />
          {uploading && <Loader />}
        </Form.Group>

        <Button className='mt-3 btn-green' type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirectInUrl ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default FarmerRegisterScreen;
