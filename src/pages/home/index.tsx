import { useEffect, useState } from "react";
import { Character } from "../../types";

const Home = () => {
  const [characters, setCharacters] = useState<Character[] | undefined>(
    undefined
  );
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
      {characters !== undefined && (
        <div>
          {characters.map((c, i) => (
            <a href="/character" key={i}>
              <h3>{c.name}</h3>
              <p>View bio</p>
            </a>
          ))}
        </div>
      )}
      {loading && <span>Loading...</span>}
      {error && (
        <span>Oops! Something went wrong while loading the characters.</span>
      )}
    </>
  );
};

export default Home;
