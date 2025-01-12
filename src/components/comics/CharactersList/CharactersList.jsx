import { Link } from "react-router-dom";
import "./CharactersList.css";

const CharactersList = ({ characters }) => {
  if (!characters || characters.available === 0) return null;

  return (
    <>
      <h3 className="characters-title">Characters</h3>
      <ul className="characters-list">
        {characters.items.map((character, index) => {
          const characterId = character.resourceURI.split("/").pop(); 
          return (
            <li className="characters" key={index}>
              <Link
                to={`/characters/${characterId}`}
                className="characters-name"
              >
                {character.name},
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharactersList;
