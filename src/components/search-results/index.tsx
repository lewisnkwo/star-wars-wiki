import { Character, Planet, Starship } from "../../types";

interface Props {
  characters: Character[] | undefined;
  planets: Planet[] | undefined;
  starships: Starship[] | undefined;
}

const SearchResults = ({ characters, planets, starships }: Props) => (
  <div>
    {characters !== undefined && (
      <>
        <hr />
        <h3>Characters</h3>
        {characters.length === 0 && <p>No characters found.</p>}
        {characters !== undefined &&
          characters.map((c, i) => <p key={i}>{c.name}</p>)}
      </>
    )}
    {planets !== undefined && (
      <>
        <hr />
        <h3>Planets</h3>
        {planets.length === 0 && <p>No planets found.</p>}
        {planets !== undefined &&
          planets.map((p, i) => <p key={i}>{p.name}</p>)}
      </>
    )}
    {starships !== undefined && (
      <>
        <hr />
        <h3>Starships</h3>
        {starships.length === 0 && <p>No starships found.</p>}
        {starships !== undefined &&
          starships.map((s, i) => <p key={i}>{s.name}</p>)}
      </>
    )}
  </div>
);

export default SearchResults;
