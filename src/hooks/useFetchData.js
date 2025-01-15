import { useState, useEffect } from "react";

const useFetchData = (apiCall, offset) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall(offset);
        setData((prevData) => [...prevData, ...(response?.data?.results || [])]);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiCall, offset]);

  return { data, loading, error };
};

export default useFetchData;
