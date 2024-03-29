import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/UI/Message';
import Loader from '../../components/UI/Loader';
import FormContainer from '../../components/UI/FormContainer';
import { userActions } from '../../features/user/userSlice';
import { login } from '../../features/user/userSlice';

const LoginScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className='mt-3 btn-green' type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link
            to={
              redirectInUrl
                ? `/register/customer?redirect=${redirect}`
                : '/register/customer'
            }
          >
            Register
          </Link>
        </Col>
      </Row>
      <Row className=''>
        <Col>
          New Farmer?{' '}
          <Link
            to={
              redirectInUrl
                ? `/register/farmer?redirect=${redirect}`
                : '/register/farmer'
            }
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
