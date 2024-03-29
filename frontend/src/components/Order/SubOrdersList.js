import React from 'react';
import { Table, Button, ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const SubOrdersList = ({ order }) => {
  return (
    <ListGroup.Item>
      <h2>Sub Orders</h2>
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {order.subOrders.map((subOrder) => (
            <tr key={subOrder._id}>
              <td>{subOrder._id}</td>
              <td>{subOrder.createdAt.substring(0, 10)}</td>
              <td>{subOrder.totalPrice}</td>
              <td>
                {subOrder.isDelivered ? (
                  subOrder.deliveredAt.substring(0, 10)
                ) : (
                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                )}
              </td>
              <td>
                <LinkContainer
                  to={`/order/${order._id}/suborder/${subOrder._id}`}
                >
                  <Button className='btn-sm' variant='light'>
                    Details
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ListGroup.Item>
  );
};

export default SubOrdersList;
