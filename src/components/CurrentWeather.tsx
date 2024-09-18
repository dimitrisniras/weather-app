'use client';

import { WiThermometer, WiHumidity, WiStrongWind } from 'react-icons/wi';
import { getWeatherIcon } from '@/components/Forecast';
import ErrorDisplay from '@/components/ErrorDisplay';

export default function CurrentWeather({ data, units }: CurrentWeatherProps) {
  if (!data) return <ErrorDisplay message="No weather data available." />;

  const temperatureUnit = units === 'metric' ? '°C' : '°F';
  const windSpeedUnit = units === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">{data.name}</h2>
      <div className="flex items-center mb-4">
        {getWeatherIcon(data.weather[0].icon)}
        <span className="text-5xl font-bold text-gray-800 ml-4">
          {Math.round(data.main.temp)}
          {temperatureUnit}
        </span>
      </div>
      <div className="flex flex-col space-y-2 text-gray-600">
        <div className="flex items-center">
          <WiThermometer className="mr-2" />
          <span>
            Feels like: {Math.round(data.main.feels_like)}
            {temperatureUnit}
          </span>
        </div>
        <p>Condition: {data.weather[0].description}</p>
        <div className="flex items-center">
          <WiHumidity className="mr-2" />
          <span>Humidity: {data.main.humidity}%</span>
        </div>
        <div className="flex items-center">
          <WiStrongWind className="mr-2" />
          <span>
            Wind speed: {data.wind.speed} {windSpeedUnit}
          </span>
        </div>
      </div>
    </div>
  );
}
