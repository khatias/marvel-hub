import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleCharacter } from "../services/api";
import styles from "../styles/pages/CharacterDetail.module.css";
import { fetchComicsByCharacter } from "../services/api";
import ComicsSlider from "../components/Sliders/ComicsSlider";
const CharactersDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingleCharacter = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSingleCharacter(id);
        const fetchedCharacter = data?.data?.results?.[0] || null;

        if (fetchedCharacter) {
          setCharacter(fetchedCharacter);
        }
      } catch (error) {
        setError("Failed to load character details. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleCharacter();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!character) return <div>No character found.</div>;

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
          <p>{character.description || "No description available."}</p>
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

      <h2 className={styles.sectionTitle}>Explore Storis</h2>
      <ul className={styles.seriesWrapper}>
        {character.stories.items.map((story, index) => (
          <li key={index}>{story.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CharactersDetails;
