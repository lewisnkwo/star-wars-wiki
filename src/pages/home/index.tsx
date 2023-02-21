import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Character, Settings } from "../../types";
import { Button, Card, Col, Row } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<Character[] | undefined>(
    undefined
  );
  const [characterSettings, setCharacterSettings] = useState<Settings>({});
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setError(false);
    setLoading(true);

    fetch("https://swapi.dev/api/people")
      .then((response) => response.json())
      .then((result) => setCharacters(result.results))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">Welcome to the Cytora Star Wars Wiki!</h1>
      <h3 className="sub-title">
        You can search by Star Wars characters, their starships & home planets.
      </h3>
      {loading && <span>Loading...</span>}
      {error && (
        <span>Oops! Something went wrong while loading the characters.</span>
      )}
      <Row xs={1} md={2} className="g-4">
        {characters !== undefined &&
          characters.map((c, i) => (
            <Col key={i}>
              <Card>
                <Card.Body>
                  <Card.Title>{c.name}</Card.Title>
                  <Button variant="info" onClick={() => navigate("/character")}>
                    View Profile
                  </Button>
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="outline-info"
                    onClick={() => {
                      setCharacterSettings({
                        ...characterSettings,
                        ...(!characterSettings[c.name]
                          ? {
                              [c.name]: {
                                isFavourite: true,
                              },
                            }
                          : {
                              [c.name]: {
                                ...characterSettings[c.name],
                                isFavourite:
                                  !characterSettings[c.name].isFavourite,
                              },
                            }),
                      });
                    }}
                  >
                    {characterSettings[c.name] &&
                    characterSettings[c.name]?.isFavourite === true
                      ? "Unfavourite"
                      : "Favourite"}
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Home;
