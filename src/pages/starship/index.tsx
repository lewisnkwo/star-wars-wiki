import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Starship } from "../../types";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const StarshipDetail = () => {
  const location = useLocation();
  const { url } = location.state;
  const navigate = useNavigate();

  const [starship, setStarship] = useState<Starship | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setError(false);
    setLoading(true);

    fetch(url)
      .then((response) => response.json())
      .then((result) => setStarship(result))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [url]);

  return (
    <Container>
      <h1>Starship Profile</h1>
      {loading && <span>Loading...</span>}
      {error && (
        <span>
          Oops! Something went wrong while loading the starship information.
        </span>
      )}
      {starship !== undefined && (
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <h4>{starship.name}</h4>
                <p>
                  <span>
                    <strong>Model: {starship.model}</strong>
                  </span>
                </p>
                <p>
                  <span>
                    <strong>Manufacturer: {starship.manufacturer}</strong>
                  </span>
                </p>
                <p>
                  <span>
                    <strong>Crew: {starship.crew}</strong>
                  </span>
                </p>
                <span className="margin-right-small">
                  <strong>Pilots:</strong>
                </span>
                {starship.pilots.length > 0 &&
                  starship.pilots.map((pilot, i) => (
                    <Button
                      key={i}
                      className="margin-right-small"
                      onClick={() =>
                        navigate("/character", {
                          state: {
                            url: pilot,
                          },
                        })
                      }
                    >
                      Pilot {i + 1}
                    </Button>
                  ))}
              </Card.Body>
              <Card.Footer>
                <Button variant="secondary" onClick={() => navigate(-1)}>
                  Go back
                </Button>
              </Card.Footer>
            </Card>
          </Col>
          <Col />
        </Row>
      )}
    </Container>
  );
};

export default StarshipDetail;
