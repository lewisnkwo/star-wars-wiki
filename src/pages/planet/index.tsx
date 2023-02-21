import { useEffect, useState } from "react";
import { Planet } from "../../types";

interface Props {
  planetUrl: string;
}

const PlanetDetail = ({ planetUrl }: Props) => {
  const [planet, setPlanet] = useState<Planet | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setError(false);
    setLoading(true);

    fetch(planetUrl)
      .then((response) => response.json())
      .then((result) => setPlanet(result))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [planetUrl]);

  return (
    <>
      {planet !== undefined && (
        <div>
          <h3>Planet name: {planet.name}</h3>
          <p>
            <strong>Terrain:</strong>
          </p>
          <span>{planet.terrain}</span>
          <p>
            <strong>Population:</strong>
          </p>
          <span>{planet.population}</span>
        </div>
      )}
      {loading && <span>Loading...</span>}
      {error && (
        <span>
          Oops! Something went wrong while loading the planet information.
        </span>
      )}
    </>
  );
};

export default PlanetDetail;
