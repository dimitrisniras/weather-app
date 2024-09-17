"use client";

import { useState } from "react";
import Search from "@/components/Search";
import CurrentWeather from "@/components/CurrentWeather";
import Forecast from "@/components/Forecast";
import { useWeatherData } from "@/hooks/useWeatherData";

export default function Home() {
  const [location, setLocation] = useState<string>("London");
  const { weatherData, forecastData, isLoading, error } =
    useWeatherData(location);

  const handleSearch = (searchLocation: string) => {
    setLocation(searchLocation);
  };

  return (
    <main
      className="container mx-auto p-4 bg-cover bg-center min-h-screen"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1501614302116-036d77974d2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
            Weather App
          </h1>
          <Search onSearch={handleSearch} />
        </div>

        {isLoading && (
          <p className="text-center text-gray-600 mt-4">Loading...</p>
        )}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <div className="flex flex-col space-y-4">
          {weatherData && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              {" "}
              {/* Removed opacity */}
              <CurrentWeather data={weatherData} />
            </div>
          )}
          {forecastData && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              {" "}
              {/* Removed opacity */}
              <Forecast data={forecastData} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
