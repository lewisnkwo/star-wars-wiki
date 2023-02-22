import { useContext, useEffect, useState } from "react";
import { Character } from "../../types";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { CharacterSettingsContext } from "../../character-settings";

const CharacterProfile = () => {
  const settings = useContext(CharacterSettingsContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { url } = location.state;

  const [character, setCharacter] = useState<Character | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setError(false);
    setLoading(true);

    fetch(url)
      .then((response) => response.json())
      .then((result) => setCharacter(result))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [url]);

  return (
    <Container>
      <h1>Character Profile</h1>
      {loading && <span>Loading...</span>}
      {error && (
        <span>Oops! Something went wrong while loading the character.</span>
      )}
      {character !== undefined && (
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{character.name}</Card.Title>
                <Card.Text>
                  <p>
                    <Button onClick={() => navigate("/planet")}>
                      Go to Home planet
                    </Button>
                  </p>
                  <p>
                    <strong>Starships:</strong>
                  </p>
                  {character.starships.length > 0 && (
                    <>
                      {character.starships.map((_, i) => (
                        <Button
                          variant="outline-primary"
                          onClick={() => navigate("/starship")}
                          key={i}
                          className="margin-right-small"
                        >
                          Starship {i + 1}
                        </Button>
                      ))}
                    </>
                  )}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="outline-info"
                  onClick={() => {
                    if (settings !== undefined) {
                      settings.setCharacterSettings({
                        ...settings.characterSettings,
                        ...(!settings.characterSettings[character.name]
                          ? {
                              [character.name]: {
                                isFavourite: true,
                              },
                            }
                          : {
                              [character.name]: {
                                ...settings.characterSettings[character.name],
                                isFavourite:
                                  !settings.characterSettings[character.name]
                                    .isFavourite,
                              },
                            }),
                      });
                    }
                  }}
                >
                  {settings !== undefined &&
                  settings.characterSettings[character.name] &&
                  settings.characterSettings[character.name]?.isFavourite ===
                    true
                    ? "Unfavourite"
                    : "Favourite"}{" "}
                  this character
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

export default CharacterProfile;
