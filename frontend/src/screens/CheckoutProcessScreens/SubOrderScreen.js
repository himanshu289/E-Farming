import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SubOrder from '../../components/SubOrder/SubOrder';
import Message from '../../components/UI/Message';
import Loader from '../../components/UI/Loader';
import GoBack from '../../components/UI/GoBack';
import { getSubOrderDetails } from '../../features/order/subOrderDetailsSlice';

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { id: orderId, subOrderId } = useParams();
  const subOrderDetailsState = useSelector((state) => state.subOrderDetails);
  const { subOrder, loading, error } = subOrderDetailsState;

  useEffect(() => {
    dispatch(getSubOrderDetails({ orderId, subOrderId }));
  }, [dispatch, orderId, subOrderId]);

  return (
    <React.Fragment>
      <GoBack />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <SubOrder subOrder={subOrder} />
      )}
    </React.Fragment>
  );
};

export default OrderScreen;
