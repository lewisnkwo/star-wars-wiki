import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/search-bar";
import { Character, Planet, Starship, SearchResource } from "./types";

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

  return (
    <div className="App">
      <SearchBar
        onSubmit={(term, resource) => {
          setSearchTerm(term);
          setSearchResource(resource);
        }}
        isSearching={searching}
      />
      {searching && <span>Searching...</span>}
      {error && (
        <span>Oops! Something went wrong while searching the wiki.</span>
      )}
      {(characters !== undefined ||
        planets !== undefined ||
        starships !== undefined) && (
        <div>
          <h2>Search results:</h2>
          {characters !== undefined && (
            <>
              <hr />
              <h3>Characters</h3>
              {characters !== undefined &&
                characters.map((c, i) => <p key={i}>{c.name}</p>)}
            </>
          )}
          {planets !== undefined && (
            <>
              <hr />
              <h3>Planets</h3>
              {planets !== undefined &&
                planets.map((p, i) => <p key={i}>{p.name}</p>)}
            </>
          )}
          {starships !== undefined && (
            <>
              <hr />
              <h3>Starships</h3>
              {starships !== undefined &&
                starships.map((s, i) => <p key={i}>{s.name}</p>)}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
