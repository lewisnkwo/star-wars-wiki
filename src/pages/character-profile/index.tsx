import { useEffect, useState } from "react";
import { Character } from "../../types";

interface Props {
  profileUrl: string;
}

const CharacterProfile = ({ profileUrl }: Props) => {
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
    <>
      {character !== undefined && (
        <div>
          <h3>Name: {character.name}</h3>
          <p>
            <strong>Home planet:</strong>
          </p>
          <span>{character.homeworld}</span>
          <p>
            <strong>Starships:</strong>
          </p>
          {character.starships.length > 0 &&
            character.starships.map((starship) => (
              <a href={starship}>{starship}</a>
            ))}
        </div>
      )}
      {loading && <span>Loading...</span>}
      {error && (
        <span>Oops! Something went wrong while loading the character.</span>
      )}
    </>
  );
};

export default CharacterProfile;
