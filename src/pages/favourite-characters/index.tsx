import { Settings } from "../../types";

interface Props {
  settings: Settings;
  updateCharacterSettings: (settings: Settings) => void;
}

interface Favourite {
  name: string;
  value: boolean;
}

const FavouriteCharacters = ({ settings, updateCharacterSettings }: Props) => {
  let favouriteList: Favourite[] = [];

  for (const [key, value] of Object.entries(settings)) {
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
                updateCharacterSettings({
                  ...settings,
                  ...(!settings[fav.name]
                    ? {
                        [fav.name]: {
                          isFavourite: true,
                        },
                      }
                    : {
                        [fav.name]: {
                          ...settings[fav.name],
                          isFavourite: !settings[fav.name].isFavourite,
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
};

export default FavouriteCharacters;
