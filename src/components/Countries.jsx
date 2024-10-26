import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, ListGroup, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";  // Import useLocation
import { initializeCountries } from "../services/countriesServices";
import { search } from "../store/countriesSlice";
import { addFavourite, removeFavourite } from "../store/favouritesSlice";
import Pagination from 'react-bootstrap/Pagination';

const Countries = () => {
  const dispatch = useDispatch();
  const location = useLocation();  // This is a react-router-dom Hook that allows us to access an object location with information about the URL we are visiting (including the state passed during navigation).
  

  // Redux state
  const countries = useSelector((state) => state.countries.countries);
  const isLoading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector((state) => state.countries.search);
  const favouritesList = useSelector((state) => state.favourites.favourites);

  // State for pagination and continent filtering
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;

  // Set selected continent based on URL state or default to "All"
  const [selectedContinent, setSelectedContinent] = useState(location.state?.continent || "All");

    useEffect(() => {
      dispatch(initializeCountries());
  }, [dispatch]);

  // Filter by continent
  const filterByContinent = (country) => {
    if (selectedContinent === "All") return true;

    if (selectedContinent === "North America" || selectedContinent === "South America") {
      return country.region === "Americas";  // REST API uses "Americas" for both
    }
    
    return country.region === selectedContinent; // Use 'region' to filter by continent
  };

  // Apply search filter and continent filter
  const filteredCountries = countries
    .filter((country) =>
      country.name.common.toLowerCase().includes(searchInput.toLowerCase())
    )
    .filter(filterByContinent);  // Apply continent filter

  // Calculate the total number of pages based on the filtered countries
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

  // Slice the filtered countries for the current page
  const paginatedCountries = filteredCountries.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  // Handle page change for pagination
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <Container fluid>
      
      <Row>
        {/* Search Bar */}
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: "18rem" }}
              type="search"
              className="me-2"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => dispatch(search(e.target.value))}
              />
          </Form>
        </Col>
      </Row>
      
          {/* Continent Filter Dropdown */}
        <Row className="my-3 d-flex justify-content-left">
          <Form.Select
            style={{ width: "18rem" }}
            value={selectedContinent}
            onChange={(e) => {
              setSelectedContinent(e.target.value);
              setActivePage(1);  // Reset to the first page when the continent changes
            }}
          >
            <option value="All">All Continents</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Oceania">Oceania</option>
          </Form.Select>
        </Row>

      {/* Countries Display */}
      <Row xs={2} md={3} lg={4} className="g-3">
        {paginatedCountries.map((country) => {
          const isFavourite = favouritesList.includes(country.name.common);

          const handleToggleFavourite = () => {
            isFavourite
              ? dispatch(removeFavourite(country.name.common))
              : dispatch(addFavourite(country.name.common));
          };

          return (
            <Col className="mt-5" key={country.name.official}>
              <Card className="h-100">
                <Link
                  to={`/countries/${country.name.common}`}
                  state={{ country: country }}
                >
                  <Card.Img
                    variant="top"
                    src={country.flags.svg}
                    alt={country.name.common}
                    className="rounded h-50"
                    style={{
                      objectFit: "cover",
                      minHeight: "200px",
                      maxHeight: "200px",
                    }}
                  />
                </Link>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{country.name.common}</Card.Title>
                  <Card.Subtitle className="mb-5 text-muted">
                    {country.name.official}
                  </Card.Subtitle>
                  <ListGroup
                    variant="flush"
                    className="flex-grow-1 justify-content-center"
                  >
                    <ListGroup.Item>
                      <i className="bi bi-people me-2">
                        {country.population.toLocaleString()}
                      </i>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="me-2">
                        {Object.values(country.currencies || {})
                          .map((currency) => currency.name)
                          .join(", ") || "No currency"}
                      </i>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="me-2">
                        {Object.values(country.languages || {})
                          .map((language) => language)
                          .join(", ") || "No language"}
                      </i>
                    </ListGroup.Item>
                  </ListGroup>

                  {/* Toggle favourite button */}
                  <Button
                    variant={isFavourite ? "warning" : "primary"}
                    onClick={handleToggleFavourite}
                  >
                    {isFavourite ? "Remove Favourite" : "Add Favourite"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Pagination */}
      {totalPages > 1 && (
        <Row className="justify-content-center mt-4">
          <Col xs="auto">
            <Pagination>
              <Pagination.Item 
                active={1 === activePage}
                onClick={() => handlePageChange(1)}
              >
                1
              </Pagination.Item>
              {activePage > 3 && <Pagination.Ellipsis />}
              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .filter((page) => page > 1 && page < totalPages)
                .filter((page) => Math.abs(page - activePage) <= 2)
                .map((page) => (
                  <Pagination.Item
                    key={page}
                    active={page === activePage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Pagination.Item>
                ))}
              {activePage < totalPages - 2 && <Pagination.Ellipsis />}
              {totalPages > 1 && (
                <Pagination.Item
                  active={totalPages === activePage}
                  onClick={() => handlePageChange(totalPages)}
                >
                  {totalPages}
                </Pagination.Item>
              )}
            </Pagination>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Countries;