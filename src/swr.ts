import useSWR from "swr/immutable";
import { Character } from "./types";

const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then((res) => res.json());

interface GetCharactersApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}

export const useCharacters = () => {
  const { data, error, isLoading } = useSWR<GetCharactersApiResponse, any>(
    `https://swapi.dev/api/people`,
    fetcher
  );

  return {
    characters: data?.results,
    loading: isLoading,
    error,
  };
};
