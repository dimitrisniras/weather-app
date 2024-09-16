"use client";

import React, { useState } from 'react';

interface SearchProps {
  onSearch: (searchLocation: string) => void;
}

function Search({ onSearch }: SearchProps) {
  const [searchInput, setSearchInput] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);   
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();   

    onSearch(searchInput);
    setSearchInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Enter city"
        value={searchInput}
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;