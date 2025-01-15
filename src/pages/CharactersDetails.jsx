import React from "react";
import { useParams } from "react-router-dom";
import { getSingleCharacter } from "../services/api";
import styles from "../styles/pages/CharacterDetail.module.css";
import { fetchComicsByCharacter } from "../services/api";
import ComicsSlider from "../components/Sliders/ComicsSlider";
import { HeartIcon } from "@heroicons/react/outline";
import { addToFavorites } from "../utils/favoritesUtils";
import useFetchSingleEntity from "../hooks/useFetchSingleEntity";
import NotFound from "../components/NotFound/NotFound";
const CharactersDetails = () => {
  const { id } = useParams();
  const { entity: character, loading, error } = useFetchSingleEntity(getSingleCharacter, id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!character) return <NotFound/>;

  return (
    <div key={character.id}>
      <div className={styles.charCardHeaderWrapper}>
        <div className={styles.charCardHeader}>
          <img
            className={styles.charImage}
            src={`${character.thumbnail.path}.jpg`}
            alt={character.name}
          />
          <div className={styles.charInfo}>
            <h1 className={styles.charName}>{character.name}</h1>
            <p className={styles.charDescription}>{character.description || "No description available."}</p>
            <button
              className={styles.favoriteButton}
              onClick={() => addToFavorites(character)}
            >
              <HeartIcon className={styles.icon} /> Add To Favorites
            </button>
          </div>
        </div>
      </div>
      <ComicsSlider
        fetchComics={fetchComicsByCharacter}
        characterId={character.id}
        SliderTitle={`Explore ${character.name}'s Adventure`}
      />
      <h2 className={styles.sectionTitle}>
        Legendary Series of {character.name.split("(")[0].trim()}
      </h2>
      <ul className={styles.seriesWrapper}>
        {character.series.items.map((series, index) => (
          <li key={index}>{series.name}</li>
        ))}
      </ul>
      <h2 className={styles.sectionTitle}>Explore Stories</h2>
      <ul className={styles.seriesWrapper}>
        {character.stories.items.map((story, index) => (
          <li key={index}>{story.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CharactersDetails;
