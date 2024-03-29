import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Card, Button } from 'react-bootstrap';
import Loader from '../UI/Loader';
import {
  deliverSubOrder,
  subOrderDeliverActions,
} from '../../features/order/subOrderDeliverSlice';
import { getSubOrderDetails } from '../../features/order/subOrderDetailsSlice';

const SubOrderSummary = ({ subOrder }) => {
  const dispatch = useDispatch();
  const { id: orderId, subOrderId } = useParams();

  const userState = useSelector((state) => state.user);
  const { userInfo } = userState;

  const subOrderDeliver = useSelector((state) => state.subOrderDeliver);
  const { loading, success } = subOrderDeliver;

  //useEffect becomes shorter
  useEffect(() => {
    if (success) {
      dispatch(subOrderDeliverActions.clearSubOrderDeliverData());
      dispatch(getSubOrderDetails({ orderId, subOrderId }));
    }
  }, [dispatch, orderId, success, subOrderId]);

  useEffect(() => {
    return () => dispatch(subOrderDeliverActions.clearSubOrderDeliverData());
  }, [dispatch]);

  const deliverHandler = () => {
    dispatch(deliverSubOrder({ subOrderId }));
  };

  return (
    <Col md={4}>
      <Card>
        <ListGroup variant='flush'>
          <ListGroup.Item className='m-auto'>
            <h2>SubOrder Summary</h2>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col>Total</Col>
              <Col>{subOrder.totalPrice}₪</Col>
            </Row>
          </ListGroup.Item>
          {loading && <Loader />}
          {userInfo &&
            userInfo?.role === 'farmer' &&
            subOrder.isPaid &&
            !subOrder.isDelivered && (
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn btn-green btn-block'
                  onClick={deliverHandler}
                >
                  Mark As Out For Delivery
                </Button>
              </ListGroup.Item>
            )}
        </ListGroup>
      </Card>
    </Col>
  );
};

export default SubOrderSummary;
