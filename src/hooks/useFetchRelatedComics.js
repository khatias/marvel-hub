import { useState, useEffect } from "react";

const useFetchComics = (fetchComics, title, characterId) => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedComics = async () => {
      setLoading(true);
      setError(null);
      try {
        const comicsData = await fetchComics(title || characterId);
        setComics(comicsData);
      } catch (err) {
        setError("Failed to load related comics.");
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedComics();
  }, [fetchComics, title, characterId]);

  return { comics, loading, error };
};

export default useFetchComics;
