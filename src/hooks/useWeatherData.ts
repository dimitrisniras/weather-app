import { useState, useEffect } from 'react';
import axios from 'axios';

export function useWeatherData(location: string, units: Units) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [weatherResponse, forecastResponse] = await Promise.all([
          axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=${units}`
          ),
          axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=${units}`
          ),
        ]);

        setWeatherData({ ...weatherResponse.data, units });
        setForecastData({ ...forecastResponse.data, units });
      } catch (error) {
        setError('Error fetching weather data. Please try again.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (location) fetchWeatherData();
  }, [location, units]);

  return { weatherData, forecastData, isLoading, error, setError };
}
