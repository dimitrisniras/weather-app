'use client';

import { useEffect, useState } from 'react';
import Search from '@/components/Search';
import CurrentWeather from '@/components/CurrentWeather';
import Forecast from '@/components/Forecast';
import { reverseGeocode } from '@/utils/geocoding';
import { useWeatherData } from '@/hooks/useWeatherData';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import ErrorDisplay from '@/components/ErrorDisplay';

export default function Home() {
  const [location, setLocation] = useState<string>('');
  const [userLocationEnabled, setUserLocationEnabled] = useState<boolean>(false);
  const [units, setUnits] = useState<Units>('metric');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { weatherData, forecastData, isLoading, error, setError } = useWeatherData(location, units);

  useEffect(() => {
    if (navigator.geolocation && userLocationEnabled) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          reverseGeocode(latitude, longitude)
            .then(cityName => setLocation(cityName))
            .catch(error => {
              console.error('Error reverse geocoding:', error);
              setError('Unable to determine your location. Please enter a city manually.');
            });
        },
        error => {
          console.error('Error getting user location:', error);
          setError('Unable to access your location. Please enter a city manually.');
        }
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

  const handleUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUnits(event.target.value as Units);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <main
      className={`container mx-auto p-4 min-h-screen bg-cover bg-center 
                  ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-300 to-green-200'}`}
      style={{}}
    >
      <div className="max-w-5xl mx-auto">
        <div className={`bg-white p-8 rounded-lg shadow-lg mb-6 ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
          <h1 className={`text-4xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-indigo-600'}`}>
            MyWeather
          </h1>
          <Search onSearch={handleSearch} />

          <div className="flex justify-end mt-4">
            {' '}
            <div className="relative inline-block text-left mr-4">
              <input
                type="checkbox"
                id="userLocationToggle"
                checked={userLocationEnabled}
                onChange={handleToggleUserLocation}
                className="hidden"
              />
              <label
                htmlFor="userLocationToggle"
                className={`inline-flex items-center cursor-pointer p-2 rounded-md 
                            ${userLocationEnabled ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'} 
                            hover:bg-blue-600 dark:hover:bg-gray-600 transition-colors duration-300`}
              >
                <span className="mr-2">
                  <MapPinIcon className="h-5 w-5 inline-block" />
                </span>
                <span>Use my location</span>
              </label>
            </div>
            <select
              value={units}
              onChange={handleUnitChange}
              className={`mr-4 border border-gray-300 rounded-md py-2 px-3 ${isDarkMode ? 'dark:bg-gray-700 dark:text-white' : ''}`}
            >
              <option value="metric">Celsius</option>
              <option value="imperial">Fahrenheit</option>
            </select>
            <button
              onClick={handleDarkModeToggle}
              className={`flex items-center p-2 rounded-md 
                          ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} 
                          hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <SunIcon className="h-5 w-5 mr-2" /> : <MoonIcon className="h-5 w-5 mr-2" />}
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center mt-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-opacity-50"></div>
            <span className="ml-2 text-gray-600 dark:text-gray-300">Fetching weather data...</span>
          </div>
        )}

        {error && <ErrorDisplay message={error} />}

        <div className="flex flex-col space-y-4">
          {weatherData && (
            <div className={`bg-white p-6 rounded-lg shadow-md ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
              <CurrentWeather data={weatherData} units={units} />
            </div>
          )}
          {forecastData && (
            <div className={`bg-white p-6 rounded-lg shadow-md ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
              <Forecast data={forecastData} units={units} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
