import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import { clearFavourites, getFavouritesFromSource } from "../store/favouritesSlice";
import CountryCard from "./CountryCard";
import { FaTrash, FaSearch } from 'react-icons/fa';

// Favourites to be written
const Favourites = () => {
  const dispatch = useDispatch();
  let countriesList = useSelector((state) => state.countries.countries);
  const [search, setSearch] = useState("");
  const countriesLoading = useSelector((state) => state.countries.isLoading);
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const favouritesLoading = useSelector((state) => state.favourites.isLoading);

  console.log("favouritesList: ", favouritesList);
  console.log("countriesList inside favourites: ", countriesList);

  if (Array.isArray(favouritesList) && favouritesList.length > 0) {
    countriesList = countriesList.filter((country) =>
      favouritesList.includes(country.name.common)
    );
  } else {
    countriesList = [];
  }

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
  }, [dispatch]);

  if (countriesLoading || favouritesLoading) {
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

  return (
    <Container fluid>
      <Row className="mt-5 justify-content-center">
        <Col xs={10} sm={8} md={6} lg={5}>
          {/* Search Bar */}
          <InputGroup className="mb-3">
            <InputGroup.Text id="search-icon">
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="search"
              placeholder="Search by country name"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row className="justify-content-center mt-3">
        <Col xs={10} sm={8} md={6} lg={5} className="d-flex justify-content-between">
          {/* Mobile view button */}
          <Button 
            onClick={() => dispatch(clearFavourites())} 
            variant="danger"
            size="sm"                 
            className="d-flex align-items-center justify-content-center d-sm-none"
          >
            <FaTrash className="me-2" size={16} />  {/* Small icon size */}
            Clear Favourites
          </Button>

          {/* Desktop view button */}
          <Button 
            onClick={() => dispatch(clearFavourites())} 
            variant="danger"
            size="lg"                 
            className="d-none d-sm-inline d-flex align-items-center justify-content-center"
          >
            <FaTrash className="me-2" size={20} />  {/* Larger icon size */}
            Clear Favourites
          </Button>
        </Col>
      </Row>

      <Row xs={2} md={3} lg={4} className="g-3">
        {countriesList
          .filter((country) => {
            return country.name.official
              .toLowerCase()
              .includes(search.toLowerCase());
          })
          .map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
      </Row>
</Container>
  );
};

export default Favourites;