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
      {loading && <span>Loading...</span>}
      {error && (
        <span>Oops! Something went wrong while loading the character.</span>
      )}
      {character !== undefined && (
        <div>
          <h3>
            Name: {character.name}
            {characterSettings.isFavourite ? "(Favourite)" : ""}
          </h3>
          <p>
            <strong>Home planet:</strong>{" "}
            <a href={character.homeworld}>{character.homeworld}</a>
          </p>
          <p>
            <strong>Starships:</strong>
          </p>
          {character.starships.length > 0 && (
            <ul>
              {character.starships.map((starship, i) => (
                <li key={i}>
                  <a href={starship}>Starship {i + 1}</a>
                </li>
              ))}
            </ul>
          )}
          <hr />
          <button onClick={() => onFavourite(!characterSettings.isFavourite)}>
            {characterSettings.isFavourite ? "Unfavourite" : "Favourite"} this
            character
          </button>
        </div>
      )}
    </>
  );
};

export default CharacterProfile;
