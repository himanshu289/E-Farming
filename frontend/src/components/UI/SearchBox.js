import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const SearchBox = () => {
  const location = useLocation();
  let currentPath = location.pathname; // to get current route
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    currentPath = currentPath.split('/search')[0];
    if (
      currentPath.search('/products') >= 0 ||
      currentPath.search('/farmers') >= 0
    ) {
      if (keyword.trim()) {
        navigate(`${currentPath}/search/${keyword}`);
      } else {
        navigate(`${currentPath}`);
      }
    } else {
      if (keyword.trim()) {
        navigate(`/search/${keyword}`);
      } else {
        navigate(`/`);
      }
    }
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search ...'
        className='mr-3'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2 mr-3'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
