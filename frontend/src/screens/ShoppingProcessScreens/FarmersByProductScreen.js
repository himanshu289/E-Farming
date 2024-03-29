import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import FarmerByProduct from '../../components/Cards/FarmerByProduct';
import Message from '../../components/UI/Message';
import Loader from '../../components/UI/Loader';
import Paginate from '../../components/UI/Paginate';
import { getFarmersByProduct } from '../../features/farmer/farmersByProductSlice';

const FarmersByProductScreen = () => {
  const dispatch = useDispatch();
  const { id, keyword, pageNumber = 1 } = useParams();

  const farmersByProductState = useSelector((state) => state.farmersByProduct);
  const { loading, error, farmersByProduct, page, pages } =
    farmersByProductState;

  useEffect(() => {
    dispatch(getFarmersByProduct({ id, keyword, pageNumber }));
  }, [dispatch, id, keyword, pageNumber]);

  return (
    <React.Fragment>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <React.Fragment>
          <Row>
            {farmersByProduct.map((farmerByProduct) => (
              <Col key={farmerByProduct._id} sm={12} md={6} Lg={4} xl={3}>
                <FarmerByProduct farmerByProduct={farmerByProduct} />
              </Col>
            ))}
          </Row>
          <Paginate total={pages} page={page} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default FarmersByProductScreen;
