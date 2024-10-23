import { Button, Card, Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { addFavourite, removeFavourite } from "../store/favouritesSlice";
import { useDispatch, useSelector } from "react-redux";

const CountryCard = ({ country }) => {
    const dispatch = useDispatch();

    // to access favorites list from Redux
    const favouritesList = useSelector((state) => state.favourites.favourites);

    // check if country is already favorite
    const isFavourite = favouritesList.includes(country.name.common);

    // function to either add or remove country from favorites.
    const handleToggleFavourite = () => {
        isFavourite 
            ? dispatch(removeFavourite(country.name.common)) 
            : dispatch(addFavourite(country.name.common));
    };

    return (
        <Col className="mt-5" key={country.name.official}>
            <Card className="h-100 d-flex flex-column">
                <Link
                    to={`/countries/${country.name.common}`}
                    state={{ country: country }}
                >
                    <Card.Img
                        variant="top"
                        src={country.flags.svg}
                        alt={country.name.common}
                        className="rounded"
                        style={{
                            objectFit: "cover",
                            minHeight: "200px",
                            maxHeight: "200px",
                        }}
                    />
                </Link>

                <Card.Body className="d-flex flex-column flex-grow-1">
                    <Card.Title>{country.name.common}</Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">
                        {country.name.official}
                    </Card.Subtitle>

                    <ListGroup variant="flush" className="mb-3 flex-grow-1">
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

                    <div className="mt-auto">
                        <Button
                            variant={isFavourite ? "warning" : "primary"}
                            onClick={handleToggleFavourite}
                        >
                            {isFavourite ? "Remove Favourite" : "Add Favourite"}
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default CountryCard;