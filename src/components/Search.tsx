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
    <form onSubmit={handleSubmit} className="flex items-center mb-4">
      <input
        type="text"
        placeholder="Enter city"
        value={searchInput}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md">Search
      </button>
    </form>
  );
}

export default Search;