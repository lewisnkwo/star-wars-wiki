import { useState } from "react";
import { SearchResource } from "../../types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export interface Props {
  onSubmit: (searchTerm: string, searchResource: SearchResource) => void;
  isSearching: boolean;
  hasResults: boolean;
  onClearSearch: () => void;
}

const SearchBar = ({
  onSubmit,
  isSearching,
  onClearSearch,
  hasResults,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResource, setSearchResource] =
    useState<SearchResource>("people");

  return (
    <>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search wiki (min. 3 characters)"
          className="me-2 search-bar"
          aria-label="Search"
          onChange={(e) => {
            e.preventDefault();
            setSearchTerm(e.currentTarget.value as SearchResource);
          }}
          value={searchTerm}
        />
        <Form.Select
          onChange={(e) =>
            setSearchResource(e.currentTarget.value as SearchResource)
          }
        >
          <option value="people">People</option>
          <option value="planets">Planets</option>
          <option value="starships">Starships</option>
        </Form.Select>

        <Button
          variant="primary"
          onClick={() => onSubmit(searchTerm, searchResource)}
          disabled={isSearching || searchTerm.length < 3}
          className="search-button"
        >
          Search
        </Button>
        {hasResults && (
          <Button variant="outline-secondary" onClick={onClearSearch}>
            Clear Search
          </Button>
        )}
      </Form>
    </>
  );
};

export default SearchBar;
