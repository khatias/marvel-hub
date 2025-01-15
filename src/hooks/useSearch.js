import { useState, useEffect } from 'react';

const useSearch = (data, searchTerm, filterKey) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (searchTerm) {
      setFilteredData(
        data.filter((item) =>
          item[filterKey]?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredData(data);
    }
  }, [data, searchTerm, filterKey]);

  return filteredData;
};

export default useSearch;
