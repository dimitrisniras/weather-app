import React, { useState } from 'react';
import Search from "@/components/Search"

export default function Home() {
  const [location, setLocation] = useState<string>('');

  const handleSearch = (searchLocation: string) => {
    setLocation(searchLocation);
  };

  return (
    <main>
      <h1>Weather App</h1>
      <Search onSearch={handleSearch} />
    </main>
  );
}