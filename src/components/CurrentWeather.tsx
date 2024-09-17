"use client";

import { WiDaySunny, WiThermometer, WiHumidity, WiStrongWind } from 'react-icons/wi';

interface CurrentWeatherProps {
  data: WeatherData;
}

function CurrentWeather({ data }: CurrentWeatherProps) {
  if (!data) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">{data.name}</h2>
      <div className="flex items-center mb-4">
        <WiDaySunny className="text-6xl mr-4 text-yellow-500" /> 
        <span className="text-5xl font-bold text-gray-800">{Math.round(data.main.temp)}°C</span> {/* Rounded temperature */}
      </div>
      <div className="flex flex-col space-y-2 text-gray-700">
        <p className="flex items-center">
          <WiThermometer className="mr-2" /> Feels like: {Math.round(data.main.feels_like)}°C {/* Rounded temperature */}
        </p>
        <p>Condition: {data.weather[0].description}</p>
        <p className="flex items-center">
          <WiHumidity className="mr-2" /> Humidity: {data.main.humidity}%
        </p>
        <p className="flex items-center">
          <WiStrongWind className="mr-2" /> Wind speed: {data.wind.speed} m/s
        </p>
      </div>
    </div>
  );
}

export default CurrentWeather;