import { useContext } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { CharacterSettingsContext } from "../../settings/character-settings";

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
        <ListGroup>
          {favouriteList
            .filter((f) => f.value)
            .map((fav, i) => (
              <ListGroup.Item key={i}>
                <span className="margin-right-small">{fav.name}</span>
                <Button
                  variant="danger"
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
                </Button>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </>
    );
  } else {
    return <span>Could not load settings.</span>;
  }
};

export default FavouriteCharacters;
