import { useState } from "react";

export interface Props {
  placeholder: string;
  onSubmit: (searchTerm: string) => void;
  isLoading: boolean;
}

const SearchBar = ({ placeholder, onSubmit, isLoading }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(searchTerm);
      }}
    >
      <input
        placeholder={placeholder}
        onChange={(e) => setSearchTerm(e.currentTarget.value)}
        disabled={isLoading}
        value={searchTerm}
      />
    </form>
  );
};

export default SearchBar;
