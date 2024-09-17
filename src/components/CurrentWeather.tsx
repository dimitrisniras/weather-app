"use client";

import {
  WiDaySunny,
  WiThermometer,
  WiHumidity,
  WiStrongWind,
} from "react-icons/wi";
import { getWeatherIcon } from "./Forecast";

interface CurrentWeatherProps {
  data: WeatherData;
}

function CurrentWeather({ data }: CurrentWeatherProps) {
  if (!data) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">{data.name}</h2>
      <div className="flex items-center mb-4">
        {getWeatherIcon(data.weather[0].icon)}{" "}
        <span className="text-5xl font-bold text-gray-800 ml-4">
          {Math.round(data.main.temp)}°C
        </span>
      </div>
      <div className="flex flex-col space-y-2 text-gray-600">
        <div className="flex items-center">
          <WiThermometer className="mr-2" />
          <span>Feels like: {Math.round(data.main.feels_like)}°C</span>
        </div>
        <p>Condition: {data.weather[0].description}</p>
        <div className="flex items-center">
          <WiHumidity className="mr-2" />
          <span>Humidity: {data.main.humidity}%</span>
        </div>
        <div className="flex items-center">
          <WiStrongWind className="mr-2" />
          <span>Wind speed: {data.wind.speed} m/s</span>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
