import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Order from '../../components/Order/Order';
import Message from '../../components/UI/Message';
import Loader from '../../components/UI/Loader';
import { getOrderDetails } from '../../features/order/orderDetailsSlice';
import { orderPayActions } from '../../features/order/orderPaySlice';

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { id: orderId } = useParams();

  const orderDetailsState = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetailsState;

  useEffect(() => {
    dispatch(orderPayActions.orderPayReset());
    dispatch(getOrderDetails({ orderId }));
  }, [dispatch, orderId]);

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Order order={order} />
      )}
    </React.Fragment>
  );
};

export default OrderScreen;
