import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    { label: 'Login', to: '/login' },
    { label: 'Shipping', to: '/shipping' },
    { label: 'Payment', to: '/payment' },
    { label: 'Place Order', to: '/placeorder' },
  ];
  return (
    <Box sx={{ width: '100%' }} my={2}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) =>
          index <= activeStep ? (
            <LinkContainer key={step.label} to={step.to}>
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            </LinkContainer>
          ) : (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          )
        )}
      </Stepper>
    </Box>
  );
};

export default CheckoutSteps;
