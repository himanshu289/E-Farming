import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Farmer from '../../components/Cards/Farmer';
import Message from '../../components/UI/Message';
import Loader from '../../components/UI/Loader';
import Paginate from '../../components/UI/Paginate';
import { getFarmers } from '../../features/farmer/farmersSlice';

const FarmersScreen = () => {
  const dispatch = useDispatch();
  const { keyword, pageNumber = 1 } = useParams();

  const farmersState = useSelector((state) => state.farmers);
  const { loading, error, farmers, page, pages } = farmersState;

  useEffect(() => {
    dispatch(getFarmers({ keyword, pageNumber }));
  }, [dispatch, keyword, pageNumber]);

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <React.Fragment>
          <Row>
            {farmers.map((farmer) => (
              <Col key={farmer._id} sm={12} md={6} lg={4} xl={3}>
                <Farmer farmer={farmer} />
              </Col>
            ))}
          </Row>
          <Paginate total={pages} page={page} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default FarmersScreen;
