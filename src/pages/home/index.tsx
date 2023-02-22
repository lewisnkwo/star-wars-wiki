import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { CharacterSettingsContext } from "../../settings/character-settings";
import { useCharacters } from "../../swr";

const Home = () => {
  const navigate = useNavigate();
  const settings = useContext(CharacterSettingsContext);

  const { loading, error, characters } = useCharacters();

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
      <div className="created-by">
        Created by Lewis Nkwo.{" "}
        <a href="https://swapi.dev" target="_blank" rel="noopener noreferrer">
          Powered by SWAPI
        </a>
      </div>
    </>
  );
};

export default Home;
