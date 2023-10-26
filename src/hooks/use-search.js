import { useState, useMemo, useCallback } from 'react';

const useSearch = (initialData) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const searchResults = useMemo(() => {
    return initialData.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, initialData]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);


  return {
    searchTerm,
    searchResults,
    handleSearchChange,
  };
};

export default useSearch;
