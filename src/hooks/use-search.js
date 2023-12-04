import { useState, useMemo, useCallback } from 'react';

const useSearch = (initialData) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const searchResults = useMemo(() => {
    if(searchTerm==''){
      return initialData 
    }
      return initialData.filter(item =>
        item.name?
        (item.name.toLowerCase().includes(searchTerm.toLowerCase())):
        //for policies
        item.customerName? 
        (item.customerName.toLowerCase().includes(searchTerm.toLowerCase())):
        //for agents
        item.firstName? 
        (item.firstName.toLowerCase().includes(searchTerm.toLowerCase())):
        (null)
      );

  }, [searchTerm, initialData]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

 
  return {
    searchTerm,
    searchResults,
    setSearchTerm,
    handleSearchChange,
  };
};

export default useSearch;
