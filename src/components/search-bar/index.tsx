import { useState } from "react";
import { SearchResource } from "../../types";

export interface Props {
  onSubmit: (searchTerm: string, searchResource: SearchResource) => void;
  isSearching: boolean;
  onClearSearch: () => void;
}

const SearchBar = ({ onSubmit, isSearching, onClearSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResource, setSearchResource] = useState<
    SearchResource | undefined
  >(undefined);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (searchResource !== undefined) onSubmit(searchTerm, searchResource);
      }}
    >
      <select
        name="Search category"
        onChange={(e) =>
          setSearchResource(e.currentTarget.value as SearchResource)
        }
      >
        <option value="people">People</option>
        <option value="planets">Planets</option>
        <option value="starships">Starships</option>
      </select>
      <input
        name="Search query"
        placeholder="Search for characters, planets and starships..."
        onChange={(e) => setSearchTerm(e.currentTarget.value)}
        disabled={isSearching}
        value={searchTerm}
      />
      <button onClick={onClearSearch}>Clear search</button>
    </form>
  );
};

export default SearchBar;
