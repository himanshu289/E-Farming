import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/UI/Message';
import Loader from '../../components/UI/Loader';

import {
  getSubOrderListByFarmer,
  subOrderListByFarmerActions,
} from '../../features/order/subOrderListByFarmerSlice';

import { getFarmerByUser } from '../../features/farmer/farmerByUserSlice';

const FarmerOrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);
  const { userInfo } = userState;

  const farmerByUserState = useSelector((state) => state.farmerByUser);
  const { farmer } = farmerByUserState;

  const subOrderListByFarmerrState = useSelector(
    (state) => state.subOrderListByFarmer
  );
  const { loading, error, subOrders } = subOrderListByFarmerrState;

  useEffect(() => {
    if (userInfo && userInfo?.role === 'farmer') {
      dispatch(getFarmerByUser({ id: userInfo._id }));
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo]);

  useEffect(() => {
    if (Object.keys(farmer).length > 0) {
      dispatch(getSubOrderListByFarmer({ farmerId: farmer._id }));
    }
  }, [dispatch, navigate, farmer]);

  useEffect(() => {
    return () =>
      dispatch(subOrderListByFarmerActions.clearSubOrderListByFarmerData());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Row className='align-items-center'>
        <Col>
          <h1>My Orders</h1>
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
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {subOrders.map((subOrder) => (
              <tr key={subOrder._id}>
                <td>{subOrder._id}</td>
                <td>{subOrder.user && subOrder.user.name}</td>
                <td>{subOrder.createdAt.substring(0, 10)}</td>
                <td>{subOrder.totalPrice}₪</td>
                <td>
                  {subOrder.isPaid ? (
                    subOrder.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {subOrder.isDelivered ? (
                    subOrder.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer
                    to={`/order/${subOrder.order}/suborder/${subOrder._id}`}
                  >
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </React.Fragment>
  );
};

export default FarmerOrderListScreen;
