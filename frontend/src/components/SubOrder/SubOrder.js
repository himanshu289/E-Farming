import React from 'react';
import { Row } from 'react-bootstrap';
import SubOrderInfo from './SubOrderInfo';
import SubOrderSummary from './SubOrderSummary';

const SubOrder = ({ subOrder }) => {
  return (
    <React.Fragment>
      <h1>SubOrder {subOrder._id}</h1>
      <Row>
        <SubOrderInfo subOrder={subOrder} />
        <SubOrderSummary subOrder={subOrder} />
      </Row>
    </React.Fragment>
  );
};

export default SubOrder;
