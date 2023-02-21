import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/nav-bar";
import SearchResults from "./components/search-results";
import Home from "./pages/home";
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

  const hasSearchResults =
    characters !== undefined ||
    planets !== undefined ||
    starships !== undefined;

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
      <NavBar
        onSubmit={(term, resource) => {
          setSearchTerm(term);
          setSearchResource(resource);
        }}
        isSearching={searching}
        hasResults={hasSearchResults}
        onClearSearch={() => {
          setCharacters(undefined);
          setPlanets(undefined);
          setStarships(undefined);
        }}
      />
      <main>
        {searching && <span>Searching...</span>}
        {error && (
          <span>Oops! Something went wrong while searching the wiki.</span>
        )}
        {hasSearchResults ? (
          <>
            <h2>Search results:</h2>
            <SearchResults
              characters={characters}
              planets={planets}
              starships={starships}
            />
          </>
        ) : (
          <Home />
        )}
      </main>
    </div>
  );
}

export default App;
