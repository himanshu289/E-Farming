import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/UI/Message';
import Loader from '../../components/UI/Loader';
import GoBack from '../../components/UI/GoBack';
import FormContainer from '../../components/UI/FormContainer';
import {
  getProductDetails,
  productDetailsActions,
} from '../../features/product/productDetailsSlice';

import {
  productUpdate,
  productUpdateActions,
} from '../../features/product/productUpdateSlice';

const ProductEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdateState = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdateState;

  useEffect(() => {
    if (successUpdate) {
      navigate('/admin/productlist');
    } else {
      if (product?._id !== id) {
        dispatch(getProductDetails({ id }));
      } else {
        setName(product.name);
        setImage(product.image);
      }
    }
  }, [dispatch, navigate, product, id, successUpdate]);

  useEffect(() => {
    return () => {
      dispatch(productDetailsActions.clearProductDetailsData());
      dispatch(productUpdateActions.clearProductUpdateData());
    };
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
    dispatch(
      productUpdate({
        product: {
          _id: id,
          name,
          image,
        },
      })
    );
  };

  return (
    <React.Fragment>
      <GoBack />
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className='mt-2' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
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

            <Button type='submit' className='mt-3 btn-green' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </React.Fragment>
  );
};

export default ProductEditScreen;
