import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Planet } from "../../types";

const PlanetDetail = () => {
  const location = useLocation();
  const { url } = location.state;
  const navigate = useNavigate();

  const [planet, setPlanet] = useState<Planet | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setError(false);
    setLoading(true);

    fetch(url)
      .then((response) => response.json())
      .then((result) => setPlanet(result))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [url]);

  return (
    <Container>
      <h1>Planet Info</h1>
      {loading && <span>Loading...</span>}
      {error && (
        <span>
          Oops! Something went wrong while loading the planet information.
        </span>
      )}
      {planet !== undefined && (
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <h4>{planet.name}</h4>
                <p>
                  <span>
                    <strong>Terrain:</strong> {planet.terrain}
                  </span>
                </p>
                <p>
                  <span>
                    <strong>Population: </strong>
                    {planet.population}
                  </span>
                </p>
                <p>
                  <span>
                    <strong>Gravity: </strong>
                    {planet.gravity}
                  </span>
                </p>
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

export default PlanetDetail;
