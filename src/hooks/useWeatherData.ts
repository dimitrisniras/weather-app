import { useState, useEffect } from "react";
import axios from "axios";

export function useWeatherData(location: string) {
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
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`,
          ),
          axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`,
          ),
        ]);

        setWeatherData(weatherResponse.data);
        setForecastData(forecastResponse.data);
      } catch (error) {
        setError("Error fetching weather data. Please try again.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (location) fetchWeatherData();
  }, [location]);

  return { weatherData, forecastData, isLoading, error };
}
