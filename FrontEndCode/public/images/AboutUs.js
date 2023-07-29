import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import allImg from '../images/all1.jpg';

export default function AboutUs() {

  return (
    <Container className="my-5">
      <h1>About Us</h1>
      <Row>
        <Col md={6}>
          <p className="lead">
            We are a team of music enthusiasts who are passionate about bringing the joy of music to everyone. Our mission is to provide high-quality musical instruments and accessories at affordable prices, making it easier for people to start their musical journeys.
          </p>
          <p>
            Our online store offers a wide range of products, from guitars and drums to keyboards and amplifiers. We source our products from reputable manufacturers and suppliers to ensure that our customers get the best value for their money.
          </p>
          <p>
            If you have any questions or comments, please feel free to contact us. We'd love to hear from you!
          </p>
        </Col>
        <Col md={6}>
          <img src={allImg} alt="Our Team" className="img-fluid rounded" />
        </Col>
      </Row>
      <hr />
      <h2>Meet Our Team</h2>
      <Row>
        <Col md={6}>
          <p><strong>Sanket</strong> - Founder and CEO</p>
          <p><strong>Aditya</strong> - Customer Support</p>
        </Col>
        <Col md={6}>
          <p><strong>Devendra</strong> - Product Manager</p>
          <p><strong>Girijesh</strong> - Marketing Specialist</p>
        </Col>
      </Row>
    </Container>
  );
}


