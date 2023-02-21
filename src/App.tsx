import React, { useEffect, useState } from "react";
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
        `https://swapi.dev/api/${searchResource}/${encodeURIComponent(
          searchTerm
        )}`
      )
        .then((response) => response.json())
        .then((result) => setCharacters(result.results))
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
      {/* <header className="App-header">

      </header> */}
    </div>
  );
}

export default App;
