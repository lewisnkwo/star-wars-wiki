import { useEffect, useState } from "react";
import { Character, CharacterSettings } from "../../types";

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
          <h3>
            Name: {character.name} {/* replace with a star icon */}
            {characterSettings.isFavourite ? "(A favourite)" : ""}
          </h3>
          <p>
            <strong>Home planet:</strong>
          </p>
          <a href={character.homeworld}>{character.homeworld}</a>
          <p>
            <strong>Starships:</strong>
          </p>
          {character.starships.length > 0 &&
            character.starships.map((starship) => (
              <a href={starship}>{starship}</a>
            ))}
          <hr />
          {/* replace with a star icon */}
          <button onClick={() => onFavourite(!characterSettings.isFavourite)}>
            Favourite this character
          </button>
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
