import { useContext } from "react";
import { CharacterSettingsContext } from "../../character-settings";

interface Favourite {
  name: string;
  value: boolean;
}

const FavouriteCharacters = () => {
  const characterSettingsContext = useContext(CharacterSettingsContext);

  if (characterSettingsContext !== undefined) {
    const { characterSettings, setCharacterSettings } =
      characterSettingsContext;

    let favouriteList: Favourite[] = [];

    for (const [key, value] of Object.entries(characterSettings)) {
      favouriteList = [
        ...favouriteList,
        {
          name: key,
          value: value?.isFavourite ?? false,
        },
      ];
    }

    return (
      <>
        <h3>Your favourite characters:</h3>
        {favouriteList
          .filter((f) => f.value)
          .map((fav, i) => (
            <p key={i}>
              <span>{fav.name}</span>
              <button
                onClick={() => {
                  setCharacterSettings({
                    ...characterSettings,
                    ...(!characterSettings[fav.name]
                      ? {
                          [fav.name]: {
                            isFavourite: true,
                          },
                        }
                      : {
                          [fav.name]: {
                            ...characterSettings[fav.name],
                            isFavourite:
                              !characterSettings[fav.name].isFavourite,
                          },
                        }),
                  });
                }}
              >
                Remove
              </button>
            </p>
          ))}
      </>
    );
  } else {
    return <span>Could not load settings.</span>;
  }
};

export default FavouriteCharacters;
