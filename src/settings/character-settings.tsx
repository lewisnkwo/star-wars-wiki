import { useState, createContext } from "react";
import { Settings } from "../types";

interface Props {
  children: JSX.Element;
}

interface CharacterSettingsContextType {
  characterSettings: Settings;
  setCharacterSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

const CharacterSettingsContext = createContext<
  CharacterSettingsContextType | undefined
>(undefined);

const CharacterSettingsProvider = ({ children }: Props) => {
  const [characterSettings, setCharacterSettings] = useState<Settings>({});

  return (
    <CharacterSettingsContext.Provider
      value={{ characterSettings, setCharacterSettings }}
    >
      {children}
    </CharacterSettingsContext.Provider>
  );
};

export { CharacterSettingsContext, CharacterSettingsProvider };
