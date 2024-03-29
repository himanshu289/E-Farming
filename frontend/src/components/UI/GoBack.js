import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const GoBack = () => {
  const navigate = useNavigate();
  const backButtonHandler = () => {
    navigate(-1);
  };
  return (
    <Link className='btn btn-light my-3' onClick={backButtonHandler}>
      Go Back
    </Link>
  );
};

export default GoBack;
