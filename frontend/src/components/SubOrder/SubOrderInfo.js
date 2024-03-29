import React from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import SubOrderInfoShipping from './SubOrderInfoShipping';
import SubOrderInfoItems from './SubOrderInfoItems';

const SubOrderInfo = ({ subOrder }) => {
  return (
    <Col md={8}>
      <ListGroup variant='flush'>
        <SubOrderInfoShipping subOrder={subOrder} />
        <SubOrderInfoItems subOrder={subOrder} />
      </ListGroup>
    </Col>
  );
};

export default SubOrderInfo;
