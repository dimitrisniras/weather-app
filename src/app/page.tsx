"use client";

import { useEffect, useState } from "react";
import Search from "@/components/Search";
import CurrentWeather from "@/components/CurrentWeather";
import Forecast from "@/components/Forecast";
import { useWeatherData } from "@/hooks/useWeatherData";
import { reverseGeocode } from "@/utils/geocoding";
import { MapPinIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [location, setLocation] = useState<string>("");
  const [userLocationEnabled, setUserLocationEnabled] = useState<boolean>(true);
  const { weatherData, forecastData, isLoading, error, setError } =
    useWeatherData(location);

  useEffect(() => {
    // Check if geolocation is supported by the browser
    if (navigator.geolocation && userLocationEnabled) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          reverseGeocode(latitude, longitude)
            .then((cityName) => setLocation(cityName))
            .catch((error) => {
              console.error("Error reverse geocoding:", error);
              setError(
                "Unable to determine your location. Please enter a city manually.",
              );
            });
        },
        (error) => {
          console.error("Error getting user location:", error);
          setError(
            "Unable to access your location. Please enter a city manually.",
          );
        },
      );
    }
  }, [userLocationEnabled]);

  const handleSearch = (searchLocation: string) => {
    setLocation(searchLocation);
    setUserLocationEnabled(false);
  };

  const handleToggleUserLocation = () => {
    setUserLocationEnabled(!userLocationEnabled);
  };

  return (
    <main
      className="container mx-auto p-4 bg-cover bg-center min-h-screen"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1566228015633-8f8fca6e50b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
      }}
    >
      <div
        className="max-w-5xl   
 mx-auto"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
            Weather App
          </h1>
          <Search onSearch={handleSearch} />

          <div className="flex justify-center items-center mb-4">
            <label
              htmlFor="userLocationToggle"
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="userLocationToggle"
                checked={userLocationEnabled}
                onChange={handleToggleUserLocation}
                className="mr-2"
              />
              <span className="text-blue-500">
                Use my location
                <MapPinIcon className="h-5 w-5 inline-block ml-1" />
              </span>
            </label>
          </div>
        </div>

        {isLoading && (
          <p className="text-center text-gray-600 mt-4">Loading...</p>
        )}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <div className="flex flex-col space-y-4">
          {weatherData && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <CurrentWeather data={weatherData} />
            </div>
          )}
          {forecastData && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Forecast data={forecastData} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
