import './CharactersList.css'
const CharactersList = ({ characters }) => {
    if (!characters || characters.available === 0) return null;
  
    return (
      <>
        <h3 className='characters-title'>Characters</h3>
        <ul className='characters-list'>
          {characters.items.map((character, index) => (
            <li className='characters' key={index}>
              <span className='characters-name'>{character.name},</span>
            </li>
          ))}
        </ul>
      </>
    );
  };
  
  export default CharactersList