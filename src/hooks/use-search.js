import { useState } from 'react';

const useSearch = (initialData = []) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(initialData);

  const handleSearch = (query) => {
    setSearchTerm(query);

    const filteredResults = initialData.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  return {
    searchTerm,
    searchResults,
    handleSearch,
  };
};

export default useSearch;
