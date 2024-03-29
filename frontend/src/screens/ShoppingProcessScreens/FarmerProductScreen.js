import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FarmerProduct from '../../components/FarmerProduct/FarmerProduct';
import Message from '../../components/UI/Message';
import Loader from '../../components/UI/Loader';
import GoBack from '../../components/UI/GoBack';
import Meta from '../../components/UI/Meta';

import {
  getFarmerProductDetails,
  farmerProductDetailsActions,
} from '../../features/farmerProduct/farmerProductDetailsSlice';

const FarmerProductScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const farmerProductDetailsState = useSelector((state) => state.farmerProduct);
  const { loading, error, farmerProduct } = farmerProductDetailsState;

  useEffect(() => {
    dispatch(getFarmerProductDetails({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(farmerProductDetailsActions.clearFarmerProductDetailsData());
    };
  }, [dispatch]);

  return (
    <React.Fragment>
      {Object.keys(farmerProduct).length > 0 && (
        <Meta
          title={`${farmerProduct.product.name} - ${farmerProduct.farmer.farmName}`}
        />
      )}
      <GoBack />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        Object.keys(farmerProduct).length > 0 && (
          <FarmerProduct farmerProduct={farmerProduct} />
        )
      )}
    </React.Fragment>
  );
};
export default FarmerProductScreen;
