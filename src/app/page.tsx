"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Search from '@/components/Search';
import CurrentWeather from '@/components/CurrentWeather';
import Forecast from '@/components/Forecast';


export default function Home() {
  const [location, setLocation] = useState<string>();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const API_KEY: unknown = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      if (!API_KEY) {
        setError('Error fetching weather data.');
        return;
      }

      const URL: unknown = process.env.NEXT_PUBLIC_WEATHER_URL;
      if (!URL) setError('Error fetching weather data.');

      setIsLoading(true);
      setError(null);

      try {

        const response = await axios.get(`${URL}/weather?q=${location}&appid=${API_KEY}&units=metric`);
        setWeatherData(response.data);
      } catch (error) {
        setError('Error fetching weather data. Please try again.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }

      try {
        const forecastResponse = await axios.get(`${URL}/forecast?q=<span class="math-inline">\{location\}&appid\=</span>${API_KEY}&units=metric`);
        setForecastData(forecastResponse.data);
      } catch (error) {
        // Handle forecast data fetching error if needed
        console.error(error);
      }
    };

    if (location) fetchWeatherData();
  }, [location]);

  const handleSearch = (searchLocation: string) => {
    setLocation(searchLocation);
  };

  return (
    <main>
      <h1>Weather App</h1>
      <Search onSearch={handleSearch} />

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && <CurrentWeather data={weatherData} />}
      {forecastData && <Forecast data={forecastData} />}
    </main>
  );
}