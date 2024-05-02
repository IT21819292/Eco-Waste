import React from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white pt-5 pb-4">
      <Container>
        <Row>
          <Col md={3} sm={6}>
            <h5 className="text-uppercase mb-4">Company</h5>
            <ListGroup variant="flush">
              <ListGroupItem className="bg-transparent border-0 p-0 mb-2">
                <a href="/about" className="text-white">About Us</a>
              </ListGroupItem>
              <ListGroupItem className="bg-transparent border-0 p-0 mb-2">
                <a href="/services" className="text-white">Services</a>
              </ListGroupItem>
              <ListGroupItem className="bg-transparent border-0 p-0 mb-2">
                <a href="/sustainability" className="text-white">Sustainability</a>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3} sm={6}>
            <h5 className="text-uppercase mb-4">Resources</h5>
            <ListGroup variant="flush">
              <ListGroupItem className="bg-transparent border-0 p-0 mb-2">
                <a href="/blog" className="text-white">Blog</a>
              </ListGroupItem>
              <ListGroupItem className="bg-transparent border-0 p-0 mb-2">
                <a href="/faqs" className="text-white">FAQs</a>
              </ListGroupItem>
              <ListGroupItem className="bg-transparent border-0 p-0 mb-2">
                <a href="/contact" className="text-white">Contact</a>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3} sm={6}>
            <h5 className="text-uppercase mb-4">Contact</h5>
            <p><strong>Phone:</strong> (123) 456-7890</p>
            <p><strong>Email:</strong> support@ecowaste.com</p>
            <p><strong>Address:</strong> 123 Eco Street, Green City</p>
          </Col>
          <Col md={3} sm={6}>
            <h5 className="text-uppercase mb-4">Follow Us</h5>
            <div>
              <a href="http://facebook.com" className="text-white me-4">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="http://twitter.com" className="text-white me-4">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="http://instagram.com" className="text-white me-4">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="text-center mt-4">
          <Col>
            <p className="text-secondary mb-0">
              © {new Date().getFullYear()} EcoWaste, Inc. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
