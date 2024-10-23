import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, ListGroup, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { initializeCountries } from "../services/countriesServices";
import { search } from "../store/countriesSlice";
import { addFavourite, removeFavourite } from "../store/favouritesSlice";
import Pagination from 'react-bootstrap/Pagination';

const Countries = () => {
  const dispatch = useDispatch();

  // Redux state
  const countries = useSelector((state) => state.countries.countries);
  const isLoading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector((state) => state.countries.search);
  const favouritesList = useSelector((state) => state.favourites.favourites);

  // Pagination state
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10; 

  // Total number of countries divided by number of countries per page to calculate amount of pages.
  const totalPages = Math.ceil(countries.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  // Handle loading state
  if (isLoading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  // Apply search filter and then slice the data for pagination
  const filteredCountries = countries
    .filter((country) =>
      country.name.common.toLowerCase().includes(searchInput.toLowerCase())
    )
    .slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

  return (
    <Container fluid>
      <Row>
        <Col className="mt-5 d-flex justify-context-center">
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
      <Row xs={2} md={3} lg={4} className="g-3">
        {filteredCountries.map((country) => {
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

      {/* Pagination Component */}
      <Row className="justify-content-center mt-4">
        <Col xs="auto">
          <Pagination>
            {/* Show first page */}
            <Pagination.Item 
              active={1 === activePage}
              onClick={() => handlePageChange(1)}
            >
              1
            </Pagination.Item>

            {/* Ellipsis if too many pages */}
            {activePage > 3 && <Pagination.Ellipsis />}

            {/* Show up to 3 pages before and after the active page */}
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

            {/* Show ellipsis if there are more pages after */}
            {activePage < totalPages - 2 && <Pagination.Ellipsis />}

            {/* Show last page */}
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
    </Container>
  );
};

export default Countries;