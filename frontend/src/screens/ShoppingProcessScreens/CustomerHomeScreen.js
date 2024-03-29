import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Product from '../../components/Cards/Product';
import Message from '../../components/UI/Message';
import Loader from '../../components/UI/Loader';
import Paginate from '../../components/UI/Paginate';
import Meta from '../../components/UI/Meta';
import {
  getProducts,
  productsActions,
} from '../../features/product/productsSlice';

const CustomerHomeScreen = () => {
  const dispatch = useDispatch();
  const { keyword, pageNumber = 1 } = useParams();

  const productsState = useSelector((state) => state.products);
  const { loading, error, products, page, pages } = productsState;

  useEffect(() => {
    dispatch(getProducts({ keyword, pageNumber }));
  }, [dispatch, keyword, pageNumber]);

  useEffect(() => {
    return () => dispatch(productsActions.clearProductsData());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Meta />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <React.Fragment>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate total={pages} page={page} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CustomerHomeScreen;
