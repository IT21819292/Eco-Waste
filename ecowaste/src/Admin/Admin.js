import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const Admin = () => {
  return (
    <Container className="mt-5">
      <Row className="d-flex justify-content-around">
        {/* Card Button 1 */}
        <Col md={5}>
          <Card className="text-center mb-4">
            <Card.Body>
              <Card.Title>Manage Orders</Card.Title>
              <Card.Text>
                View and manage Orders.
              </Card.Text>
              <Button variant="primary" href="/checkoutdashboard">Go to Checkouts</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Card Button 2 */}
        <Col md={5}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>ManageLocation Requests</Card.Title>
              <Card.Text>
                Review and process new Location requests.
              </Card.Text>
              <Button variant="primary" href="/requestdashboard">View Requests</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
