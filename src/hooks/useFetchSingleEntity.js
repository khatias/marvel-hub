import { useState, useEffect } from "react";

const useFetchSingleEntity = (fetchFunction, id) => {
  const [entity, setEntity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchFunction(id);
        const fetchedEntity = data?.data?.results?.[0] || null;

        if (fetchedEntity) {
          const storyIds =
            fetchedEntity?.stories?.items?.map((item) =>
              item.resourceURI.split("/").pop()
            ) || [];
          setEntity({ ...fetchedEntity, storyIds });
        }
      } catch (error) {
        setError("Failed to load details. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntity();
  }, [fetchFunction, id]);

  return { entity, loading, error };
};

export default useFetchSingleEntity;
