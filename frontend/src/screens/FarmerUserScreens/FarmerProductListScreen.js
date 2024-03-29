import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/UI/Message';
import Loader from '../../components/UI/Loader';
import {
  getProductsByFarmer,
  productsByFarmerActions,
} from '../../features/product/productsByFarmerSlice';

import { getFarmerByUser } from '../../features/farmer/farmerByUserSlice';

const FarmerProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);
  const { userInfo } = userState;

  const farmerByUserState = useSelector((state) => state.farmerByUser);
  const { farmer } = farmerByUserState;

  const productsByFarmerState = useSelector((state) => state.productsByFarmer);
  const { loading, error, productsByFarmer } = productsByFarmerState;

  useEffect(() => {
    if (userInfo && userInfo?.role === 'farmer') {
      dispatch(getFarmerByUser({ id: userInfo._id }));
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo]);

  useEffect(() => {
    if (Object.keys(farmer).length > 0) {
      dispatch(getProductsByFarmer({ id: farmer._id }));
    }
  }, [dispatch, navigate, farmer]);

  useEffect(() => {
    return () => dispatch(productsByFarmerActions.clearProductsByFarmerData());
  }, [dispatch]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      // DELETE PRODUCTS
    }
  };

  const createFarmerProductHandler = () => {
    navigate('/farmer/farmerproduct/create');
  };

  return (
    <React.Fragment>
      <Row className='align-items-center'>
        <Col>
          <h1>My Products</h1>
        </Col>
        <Col className='text-right'>
          <Button
            className='my-3 btn-green'
            onClick={createFarmerProductHandler}
          >
            <i className='fas fa-plus'></i> Create New Product
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>PRODUCT TYPE</th>
              <th>PRICE</th>
              <th>COUNT IN STOCK</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {productsByFarmer.map((farmerProduct) => (
              <tr key={farmerProduct._id}>
                <td>{farmerProduct._id}</td>
                <td>{farmerProduct.product.name}</td>
                <td>{farmerProduct.price}₪</td>
                <td>{farmerProduct.countInStock}</td>

                <td>
                  <LinkContainer
                    to={`/farmer/farmerproduct/${farmerProduct._id}/edit`}
                  >
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(farmerProduct._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </React.Fragment>
  );
};

export default FarmerProductListScreen;
