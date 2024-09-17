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
      style={{}}
    >
      <div className="max-w-5xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
            Weather App
          </h1>
          <Search onSearch={handleSearch} />
        </div>

        {isLoading && (
          <div className="flex justify-center items-center mt-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <div className="flex flex-col space-y-4">
          {weatherData && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              {" "}
              <CurrentWeather data={weatherData} />
            </div>
          )}
          {forecastData && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              {" "}
              <Forecast data={forecastData} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
