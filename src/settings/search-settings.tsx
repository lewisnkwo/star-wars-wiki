import { createContext, useState } from "react";

interface Props {
  children: JSX.Element;
}

interface SearchSettings {
  hasSearch: boolean;
  isSearching: boolean;
}

interface SearchSettingsContextType {
  searchSettings: SearchSettings;
  setSearchSettings: React.Dispatch<
    React.SetStateAction<SearchSettings>
  > | null;
}

const SearchSettingsContext = createContext<SearchSettingsContextType>({
  searchSettings: {
    hasSearch: false,
    isSearching: false,
  },
  setSearchSettings: null,
});

const SearchSettingsProvider = ({ children }: Props) => {
  const [searchSettings, setSearchSettings] = useState<SearchSettings>({
    hasSearch: false,
    isSearching: false,
  });

  return (
    <SearchSettingsContext.Provider
      value={{ searchSettings, setSearchSettings }}
    >
      {children}
    </SearchSettingsContext.Provider>
  );
};

export { SearchSettingsContext, SearchSettingsProvider };
