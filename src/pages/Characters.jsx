import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCharacters } from "../services/api";
import LoadMoreButton from "../components/buttons/LoadMoreButton/LoadMoreButton";
import styles from "../styles/pages/Characters.module.css";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";
const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const data = await getCharacters(offset);
        setCharacters((prevCharacters) => [
          ...prevCharacters,
          ...(data?.data?.results || []),
        ]);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching characters:", err);
      } finally {
        setLoading(false);
        setIsLoadingMore(false);
      }
    };

    fetchCharacters();
  }, [offset]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setOffset((prevOffset) => prevOffset + 20);
  };

  if (loading && characters.length === 0) return <Loader />;
  if (error)
    return <Error message={error} onRetry={() => window.location.reload()} />;

  return (
    <main>
      <div className={styles.charactersContainer}>
        {characters.map((character, index) => (
          <div className={styles.characterCard} key={index}>
        
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              className={styles.characterImage}
            />
            <div className={styles.characterContent}>
              <h3 className={styles.characterName}>{character.name}</h3>

              <button
                className={styles.viewDetailsButt}
                onClick={() => navigate(`/characters/${character.id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <LoadMoreButton onClick={handleLoadMore} isLoading={isLoadingMore} />
    </main>
  );
};

export default Characters;
