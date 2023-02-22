import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ResultsDetail from "../../components/search-results";
import { Character, Planet, Starship } from "../../types";

const SearchResults = () => {
  const location = useLocation();
  const { searchTerm, searchResource } = location.state;
  const navigate = useNavigate();

  const [characters, setCharacters] = useState<Character[] | undefined>(
    undefined
  );
  const [planets, setPlanets] = useState<Planet[] | undefined>(undefined);
  const [starships, setStarships] = useState<Starship[] | undefined>(undefined);

  const [error, setError] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);

  useEffect(() => {
    if (searchTerm !== undefined && searchTerm.length >= 3) {
      setError(false);
      setSearching(true);

      fetch(
        `https://swapi.dev/api/${searchResource}?search=${encodeURIComponent(
          searchTerm
        )}`
      )
        .then((response) => response.json())
        .then(({ results }) => {
          if (searchResource === "people") {
            setPlanets(undefined);
            setStarships(undefined);
            setCharacters(results);
          } else if (searchResource === "planets") {
            setCharacters(undefined);
            setStarships(undefined);
            setPlanets(results);
          } else if (searchResource === "starships") {
            setCharacters(undefined);
            setPlanets(undefined);
            setStarships(results);
          }
        })
        .catch(() => setError(true))
        .finally(() => setSearching(false));
    }
  }, [searchTerm, searchResource]);

  const hasSearchResults =
    characters !== undefined ||
    planets !== undefined ||
    starships !== undefined;

  return (
    <Container>
      {searching && <span>Searching...</span>}
      {error && (
        <span>Oops! Something went wrong while searching the wiki.</span>
      )}
      {hasSearchResults && (
        <>
          <h1>Search results:</h1>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <ResultsDetail
                    characters={characters}
                    planets={planets}
                    starships={starships}
                  />
                </Card.Body>
                <Card.Footer>
                  <Button variant="secondary" onClick={() => navigate("/")}>
                    Go back to home
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
            <Col />
          </Row>
        </>
      )}
    </Container>
  );
};

export default SearchResults;
