import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { initializeCountries } from '../store/countriesSlice'; 

const HomePage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.countries);

  useEffect(() => {
    console.log("Countries length:", countries.length);
    if (countries.length === 0) {
      console.log("Dispatching initializeCountries");
      dispatch(initializeCountries());
    } else {
      setIsLoading(false);
    }
  }, [dispatch, countries.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (countries.length === 0) {
      console.log("Countries not loaded yet");
      alert('Countries are still loading. Please try again in a moment.');
      return;
    }
    
    const searchTerm = searchInput.toLowerCase().trim();
    console.log("Search term:", searchTerm);
    console.log("Countries:", countries);

    const foundCountry = countries.find(country => 
      country.name.common.toLowerCase() === searchTerm
    );

    console.log("Found country:", foundCountry);

    if (foundCountry) {
      navigate(`/countries/${foundCountry.name.common}`, { state: { country: foundCountry } });
    } else {
      alert('Country not found. Please try again.');
    }
  };

  return (
    <Container fluid>
      {/* Hero Section */}
      <Row 
        className="hero-section text-center py-5" 
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1502920514313-52581002a659?q=80&w=2934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Col>
          <h1>Explore the world</h1>
          <p>Discover, favorite, and learn about countries across the globe.</p>
        </Col>
      </Row>

      {/* Search Section */}
      <Row className="text-center my-5">
        <Col>
          <h2>Search for a Country</h2>
          {isLoading ? (
            <p>Loading countries...</p>
          ) : (
            <Form onSubmit={handleSearch} className="d-flex justify-content-center mt-3">
              <Form.Control 
                type="search" 
                placeholder="Search for a country..." 
                style={{ width: '300px' }} 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Button variant="primary" type="submit" size="lg">Search</Button>
            </Form>
          )}
        </Col>
      </Row>

                  {/* Featured Continents */}
                  <Row className="mt-5 g-3" xs={1} sm={2} md={4}>
                  <Col className="d-flex justify-content-center mb-3">  
          <Card className="h-100" style={{ width: "18rem", minHeight: "400px" }}>
            <Card.Img
              variant="top"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "220px"
              }}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Europe</Card.Title>
              <Card.Text>Discover countries in Europe.</Card.Text>
              <Link to="/countries" state={{ continent: "Europe" }}>
                <Button variant="primary" size="lg" className="mt-auto">Explore Europe</Button>
              </Link>          
            </Card.Body>
          </Card>
        </Col>

        <Col className="d-flex justify-content-center mb-3">
          <Card className="h-100" style={{ width: "18rem", minHeight: "400px" }}>
            <Card.Img
              variant="top"
              style={{ 
                backgroundImage: "url('https://plus.unsplash.com/premium_photo-1677829177639-28be8d494543?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "220px"
              }}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Asia</Card.Title>
              <Card.Text>Learn about countries in Asia.</Card.Text>
              <Link to="/countries" state={{ continent: "Asia" }}>
                <Button variant="primary" size="lg" className="mt-auto">Explore Asia</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col className="d-flex justify-content-center mb-3">
          <Card className="h-100" style={{ width: "18rem", minHeight: "400px" }}>
            <Card.Img
              variant="top"
              style={{ 
                backgroundImage: "url('https://plus.unsplash.com/premium_photo-1664302769311-95bbc931bee5?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "220px"
              }}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Africa</Card.Title>
              <Card.Text>Explore countries in Africa.</Card.Text>
              <Link to="/countries" state={{ continent: "Africa" }}>
                <Button variant="primary" size="lg" className="mt-auto">Explore Africa</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col className="d-flex justify-content-center mb-3">
          <Card className="h-100" style={{ width: "18rem", minHeight: "400px" }}>
            <Card.Img
              variant="top"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1570630819727-b32fda434a7a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "220px"
              }}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Americas</Card.Title>
              <Card.Text>Explore countries in the Americas.</Card.Text>
              <Link to="/countries" state={{ continent: "Americas" }}>
                <Button variant="primary" size="lg" className="mt-auto">Explore Americas</Button>
              </Link>
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
