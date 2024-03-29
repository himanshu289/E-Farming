import React from 'react';
import { Row } from 'react-bootstrap';
import FarmerInfo from './FarmerInfo';
import ProductInfo from './ProductInfo';
import FarmerProductSummary from './FarmerProductSummary';

const FarmerProduct = ({ farmerProduct }) => {
  return (
    <Row>
      <FarmerInfo farmerProduct={farmerProduct} />
      <ProductInfo farmerProduct={farmerProduct} />
      <FarmerProductSummary farmerProduct={farmerProduct} />
    </Row>
  );
};

export default FarmerProduct;
