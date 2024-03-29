import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Farmer from '../../components/Farmer/Farmer';
import Message from '../../components/UI/Message';
import Loader from '../../components/UI/Loader';
import GoBack from '../../components/UI/GoBack';
import { getFarmer, farmerActions } from '../../features/farmer/farmerSlice';

const FarmerScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const farmerState = useSelector((state) => state.farmer);
  const { loading, error, farmer } = farmerState;

  useEffect(() => {
    dispatch(getFarmer({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(farmerActions.clearFarmerData());
    };
  }, [dispatch]);

  return (
    <React.Fragment>
      <GoBack />
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {Object.keys(farmer).length > 0 && <Farmer farmer={farmer} />}
    </React.Fragment>
  );
};

export default FarmerScreen;
