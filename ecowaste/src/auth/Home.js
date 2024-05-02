import React from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import slide1 from '../images/slid3.jpg';

const ServiceCarousel = () => (
  <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={slide1}
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>Regular Services</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <Button variant="primary">Learn More</Button>
      </Carousel.Caption>
    </Carousel.Item>
    {/* More Carousel.Item components as needed */}
  </Carousel>
);

const AboutSection = () => (
  <div className="my-5">
    <h2>About Us</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <Button variant="primary">Learn More</Button>
  </div>
);

const HowItWorksSection = () => (
  <div className="my-5">
    <h2>How Does It Work?</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <Button variant="primary">Learn More</Button>
  </div>
);

const HomePage = () => {
  return (
    <Container>
      <br/>
      <br/>
      <ServiceCarousel />
      <Row>
        <Col md={6}>
          <AboutSection />
        </Col>
        <Col md={6}>
          <HowItWorksSection />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
