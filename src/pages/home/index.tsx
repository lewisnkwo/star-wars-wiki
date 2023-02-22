import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Character } from "../../types";
import { Button, Card, Col, Row } from "react-bootstrap";
import { CharacterSettingsContext } from "../../character-settings";

const Home = () => {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<Character[] | undefined>(
    undefined
  );
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const settings = useContext(CharacterSettingsContext);

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
                  <Button
                    variant="info"
                    onClick={() =>
                      navigate("/character", {
                        state: {
                          url: c.url,
                        },
                      })
                    }
                  >
                    View Profile
                  </Button>
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="outline-info"
                    onClick={() => {
                      if (settings !== undefined) {
                        settings.setCharacterSettings({
                          ...settings.characterSettings,
                          ...(!settings.characterSettings[c.name]
                            ? {
                                [c.name]: {
                                  isFavourite: true,
                                },
                              }
                            : {
                                [c.name]: {
                                  ...settings.characterSettings[c.name],
                                  isFavourite:
                                    !settings.characterSettings[c.name]
                                      .isFavourite,
                                },
                              }),
                        });
                      }
                    }}
                  >
                    {settings !== undefined &&
                    settings.characterSettings[c.name] &&
                    settings.characterSettings[c.name]?.isFavourite === true
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
