import { useEffect, useState } from "react";
import { Starship } from "../../types";

interface Props {
  starshipUrl: string;
}

const StarshipDetail = ({ starshipUrl }: Props) => {
  const [starship, setStarship] = useState<Starship | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setError(false);
    setLoading(true);

    fetch(starshipUrl)
      .then((response) => response.json())
      .then((result) => setStarship(result))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [starshipUrl]);

  return (
    <>
      {starship !== undefined && (
        <div>
          <h3>Starship name: {starship.name}</h3>
          <p>
            <strong>Model:</strong>
          </p>
          <span>{starship.model}</span>
          <p>
            <strong>Pilots:</strong>
          </p>
          {starship.pilots.length > 0 &&
            starship.pilots.map((pilot) => (
              <span>
                <a href={pilot}>{pilot}</a>
              </span>
            ))}
        </div>
      )}
      {loading && <span>Loading...</span>}
      {error && (
        <span>
          Oops! Something went wrong while loading the starship information.
        </span>
      )}
    </>
  );
};

export default StarshipDetail;
