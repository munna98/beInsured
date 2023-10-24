import { useState } from 'react';

const useSearch = (initialData) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(initialData);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  
    const filteredResults = initialData.filter((item) =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
  
    setSearchResults(filteredResults);
  };
  

  return {
    searchTerm,
    searchResults,
    handleSearchChange,
  };
};

export default useSearch;
