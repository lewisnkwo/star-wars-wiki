import { useEffect, useState } from "react";
import { Character, Settings } from "../../types";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";

const Home = () => {
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
      <Row xs={1} md={2} className="g-4">
        {characters !== undefined &&
          characters.map((c, i) => (
            <Col key={i}>
              <Card>
                <Card.Body>
                  <Card.Title>{c.name}</Card.Title>
                  <Button variant="info">View Profile</Button>
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
      {loading && <span>Loading...</span>}
      {error && (
        <span>Oops! Something went wrong while loading the characters.</span>
      )}
    </>
  );
};

export default Home;
