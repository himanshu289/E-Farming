import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button } from 'react-bootstrap';
import { cartActions } from '../../features/cart/cartSlice';
import { addToCart } from '../../features/cart/cartThunk';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const cartChangeHandelr = (item, e) => {
    const farmerProductId = item.farmerProduct;
    const qty = Number(e.target.value);
    dispatch(addToCart({ farmerProductId, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(cartActions.removeItemFromCart({ id }));
  };

  return (
    <ListGroup.Item key={item.farmerProduct}>
      <Row>
        <Col
          className='d-flex justify-content-center align-items-center my-2 mx-auto'
          xs={6}
          md={2}
          xl={2}
        >
          <Image
            className='farmer-img-cart-item'
            src={item.farmerImage}
            alt={item.farmerName}
            fluid
            rounded
          />
        </Col>
        <Col
          className='d-flex justify-content-center align-items-center my-2 mx-auto'
          xs={6}
          md={2}
          xl={2}
        >
          <Image
            className='product-img-cart-item'
            src={item.productImage}
            alt={item.productName}
            fluid
            rounded
          />
        </Col>
        <Col
          className='d-flex justify-content-center align-items-center my-2 mx-auto text-center'
          xs={6}
          md={2}
          xl={2}
        >
          <Link to={`/farmer-product/${item.farmerProduct}`}>
            {item.farmerName}
          </Link>
        </Col>

        <Col
          className=' d-flex justify-content-center align-items-center my-2 mx-auto text-center'
          xs={6}
          md={1}
          xl={1}
        >
          <Link to={`/farmer-product/${item.farmerProduct}`}>
            {item.productName}
          </Link>
        </Col>

        <Col
          className=' d-flex justify-content-center align-items-center my-2 mx-auto text-center '
          xs={12}
          md={1}
          xl={1}
        >
          <div>{item.price}₪</div>
        </Col>

        <Col
          className='d-flex justify-content-center align-items-center my-2 mx-auto'
          xs={12}
          md={2}
          xl={2}
        >
          <Form.Control
            as='select'
            value={item.qty}
            onChange={(e) => cartChangeHandelr(item, e)}
          >
            {[...Array(item.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col
          className='d-flex justify-content-center align-items-center my-2 mx-auto'
          xs={12}
          md={2}
          xl={2}
        >
          <Button
            className='btn-block'
            type='button'
            ariant='light'
            onClick={() => removeFromCartHandler(item.farmerProduct)}
          >
            <i className='fas fa-trash'></i>
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default CartItem;
