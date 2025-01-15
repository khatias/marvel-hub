import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCharacters } from "../services/api";
import LoadMoreButton from "../components/buttons/LoadMoreButton/LoadMoreButton";
import styles from "../styles/pages/Characters.module.css";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";
import { Link } from "react-router-dom";
import useSearch from "../hooks/useSearch";
import useFetchData from "../hooks/useFetchData";

const Characters = () => {
  const [offset, setOffset] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const {
    data: characters,
    loading,
    error,
  } = useFetchData(getCharacters, offset);
  
  const filteredCharacters = useSearch(characters, searchTerm, "name");
  const navigate = useNavigate();

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
        {filteredCharacters.map((character, index) => (
          <div className={styles.characterCard} key={index}>
            <Link to={`/characters/${character.id}`}>
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
            </Link>
          </div>
        ))}
      </div>
      <LoadMoreButton onClick={handleLoadMore} isLoading={isLoadingMore} />
    </main>
  );
};

export default Characters;
