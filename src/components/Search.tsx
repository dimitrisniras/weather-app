'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

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
        className="border border-gray-300 rounded-md py-2 px-3 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 
                   placeholder-gray-500 text-gray-800"
        aria-label="Search for a city" // Added for accessibility
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-2"
        aria-label="Search" // Added for accessibility
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </form>
  );
}

export default Search;
