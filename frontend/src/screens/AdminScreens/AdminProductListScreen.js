import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/UI/Message';
import Loader from '../../components/UI/Loader';
import Paginate from '../../components/UI/Paginate';

import {
  getProducts,
  productsActions,
} from '../../features/product/productsSlice';

import {
  productCreate,
  productCreateActions,
} from '../../features/product/productCreateSlice';

const AdminProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pageNumber = 1 } = useParams();
  const userState = useSelector((state) => state.user);
  const { userInfo } = userState;

  const productsState = useSelector((state) => state.products);
  const { loading, error, products, page, pages } = productsState;

  const productCreateState = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreateState;

  useEffect(() => {
    dispatch(productCreateActions.clearProductCreateData());
    if (!userInfo || userInfo?.role !== 'admin') {
      navigate('/login');
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(getProducts({ pageNumber }));
    }
  }, [dispatch, navigate, userInfo, successCreate, createdProduct, pageNumber]);

  useEffect(() => {
    return () => dispatch(productsActions.clearProductsData());
  }, [dispatch]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      // DELETE PRODUCTS
    }
  };

  const productCreateHandler = () => {
    dispatch(productCreate());
  };
  return (
    <React.Fragment>
      <Row className='align-items-center'>
        <Col>
          <h1>System Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3 btn-green' onClick={productCreateHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <React.Fragment>
          {' '}
          <Table striped bordered hover responsive className='table-sm '>
            <thead>
              <tr>
                <th>ID</th>
                <th>PRODUCT Name</th>
                <th className='text-center'>Image</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td className='text-center'>
                    <Image
                      className='product-img-table-row'
                      src={product.image}
                      alt={product.name}
                      fluid
                      rounded
                    />
                  </td>

                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate total={pages} page={page} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default AdminProductListScreen;
