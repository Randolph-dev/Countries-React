import React from 'react';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

const HomePage = () => {
  return (
    <Container fluid>
      {/* Hero Section */}
      <Row className="hero-section text-center py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Col>
          <h1>Explore the World of Countries</h1>
          <p>Discover, favorite, and learn about countries across the globe.</p>
        </Col>
      </Row>

      {/* Search Section */}
      <Row className="text-center my-5">
        <Col>
          <h2>Search for a Country</h2>
          <Form className="d-flex justify-content-center mt-3">
            <Form.Control type="search" placeholder="Search for a country..." style={{ width: '300px' }} />
            <Link to="/countries">
              <Button variant="primary" size="lg">Browse Countries</Button>
            </Link>            
          </Form>
        </Col>
      </Row>

      {/* Featured Regions */}
      <Row className="mt-5">
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="europe.jpg" />
            <Card.Body>
              <Card.Title>Europe</Card.Title>
              <Card.Text>Discover countries in Europe.</Card.Text>
              <Link to="/countries">
                <Button variant="primary" size="lg">Explore Europe</Button>
              </Link>             
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="asia.jpg" />
            <Card.Body>
              <Card.Title>Asia</Card.Title>
              <Card.Text>Learn about countries in Asia.</Card.Text>
              <Link to="/countries">
                <Button variant="primary" size="lg">Explore Asia</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="africa.jpg" />
            <Card.Body>
              <Card.Title>Africa</Card.Title>
              <Card.Text>Explore countries in Africa.</Card.Text>
              <Button variant="primary" href="/countries?region=Africa">Explore Africa</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="Americas.jpg" />
            <Card.Body>
              <Card.Title>Americas</Card.Title>
              <Card.Text>Explore countries in the Americas.</Card.Text>
              <Button variant="primary" href="/countries?region=Americas">Explore the Americas</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Footer */}
      <Row className="text-center mt-5">
        <Col>
          <footer className="bg-dark text-white py-3">
            <p>© 2024 Country Explorer. All rights reserved.</p>
            <a href="/privacy" className="text-white">Privacy Policy</a> | 
            <a href="/contact" className="text-white">Contact Us</a>
          </footer>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;