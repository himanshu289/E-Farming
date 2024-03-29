import React from 'react';
import { Row } from 'react-bootstrap';
import FarmerInfo from './FarmerInfo';
import FarmerReviews from './FarmerReviews';

const Farmer = ({ farmer }) => {
  return (
    <React.Fragment>
      <Row>
        <FarmerInfo farmer={farmer} />
        <FarmerReviews farmer={farmer} />
      </Row>
    </React.Fragment>
  );
};

export default Farmer;
