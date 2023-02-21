import { useEffect, useState } from "react";
import { Character, CharacterSettings } from "../../types";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Props {
  profileUrl: string;
  characterSettings: CharacterSettings;
  onFavourite: (v: boolean) => void;
}

const CharacterProfile = ({
  profileUrl,
  characterSettings,
  onFavourite,
}: Props) => {
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setError(false);
    setLoading(true);

    fetch(profileUrl)
      .then((response) => response.json())
      .then((result) => setCharacter(result))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [profileUrl]);

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
                  onClick={() => onFavourite(!characterSettings.isFavourite)}
                >
                  {characterSettings.isFavourite ? "Unfavourite" : "Favourite"}{" "}
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
