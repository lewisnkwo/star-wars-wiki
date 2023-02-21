import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/search-bar";
import { Character, Planet, SearchResource, Starship } from "./types";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResource, setSearchResource] = useState<
    SearchResource | undefined
  >(undefined);

  const [characters, setCharacters] = useState<Character[] | undefined>(
    undefined
  );
  const [planets, setPlanets] = useState<Planet[] | undefined>(undefined);
  const [starships, setStarships] = useState<Starship[] | undefined>(undefined);

  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (searchTerm !== undefined && searchTerm.length >= 3) {
      setError(false);
      setLoading(true);

      fetch(
        `https://swapi.dev/api/${searchResource}?search=${encodeURIComponent(
          searchTerm
        )}`
      )
        .then((response) => response.json())
        .then(({ results }) => {
          if (searchResource === "people") {
            setCharacters(results);
          } else if (searchResource === "planets") {
            setPlanets(results);
          } else if (searchResource === "starships") {
            setStarships(results);
          }
        })
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }, [searchTerm, searchResource]);

  return (
    <div className="App">
      <SearchBar
        onSubmit={(term, resource) => {
          setSearchTerm(term);
          setSearchResource(resource);
        }}
        isLoading={loading}
      />
      {loading && <span>Searching...</span>}
      {error && (
        <span>Oops! Something went wrong while searching the wiki.</span>
      )}
      {(characters !== undefined ||
        planets !== undefined ||
        starships !== undefined) && (
        <div>
          <h2>Search results:</h2>
        </div>
      )}
    </div>
  );
}

export default App;
