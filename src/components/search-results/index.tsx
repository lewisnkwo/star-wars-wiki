import { Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Character, Planet, Starship } from "../../types";

interface Props {
  characters: Character[] | undefined;
  planets: Planet[] | undefined;
  starships: Starship[] | undefined;
}

const SearchResults = ({ characters, planets, starships }: Props) => {
  const navigate = useNavigate();

  return (
    <ListGroup>
      {characters !== undefined && (
        <>
          <h3>Characters</h3>
          {characters.length === 0 && <p>No characters found.</p>}
          {characters !== undefined &&
            characters.map((c, i) => (
              <ListGroup.Item key={i}>
                <span className="margin-right-small">{c.name}</span>
                <Button
                  variant="primary"
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
              </ListGroup.Item>
            ))}
        </>
      )}
      {planets !== undefined && (
        <>
          <h3>Planets</h3>
          {planets.length === 0 && <p>No planets found.</p>}
          {planets !== undefined &&
            planets.map((p, i) => (
              <ListGroup.Item key={i}>{p.name}</ListGroup.Item>
            ))}
        </>
      )}
      {starships !== undefined && (
        <>
          <h3>Starships</h3>
          {starships.length === 0 && <p>No starships found.</p>}
          {starships !== undefined &&
            starships.map((s, i) => (
              <ListGroup.Item key={i}>{s.name}</ListGroup.Item>
            ))}
        </>
      )}
    </ListGroup>
  );
};

export default SearchResults;
