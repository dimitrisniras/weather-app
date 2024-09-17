"use client";

import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiSnow,
  WiWindDeg,
} from "react-icons/wi";
import ErrorDisplay from "@/components/ErrorDisplay";

interface ForecastProps {
  data: ForecastData;
}

export const getWeatherIcon = (iconCode: string) => {
  switch (iconCode) {
    case "01d": // Clear sky (day)
    case "01n": // Clear sky (night)
      return <WiDaySunny className="text-3xl text-yellow-500" />;
    case "02d": // Few clouds (day)
    case "02n": // Few clouds (night)
    case "03d": // Scattered clouds (day)
    case "03n": // Scattered clouds (night)
    case "04d": // Broken clouds (day)
    case "04n": // Broken clouds (night)
      return <WiCloudy className="text-3xl text-gray-600" />;
    case "09d": // Shower rain (day)
    case "09n": // Shower rain (night)
    case "10d": // Rain (day)
    case "10n": // Rain (night)
      return <WiRain className="text-3xl text-blue-500" />;
    case "13d": // Snow (day)
    case "13n": // Snow (night)
      return <WiSnow className="text-3xl text-gray-300" />;
    default:
      return <WiDaySunny className="text-3xl text-yellow-500" />;
  }
};

function Forecast({ data }: ForecastProps) {
  if (!data || !data.list || data.list.length === 0)
    return <ErrorDisplay message="No weather data available." />;

  const hourlyForecasts = data.list.slice(0, 12);

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Hourly Forecast
      </h3>
      <div className="flex overflow-x-auto">
        {hourlyForecasts.map((item) => (
          <div
            key={item.dt}
            className="flex-none w-40 sm:w-48 min-w-[10rem] md:min-w-[12rem] bg-white p-4 rounded-lg shadow-md mr-4 hover:bg-gray-100 transition-colors duration-300"
          >
            <p className="text-center text-sm mb-2 font-medium text-gray-800">
              {" "}
              {new Date(item.dt * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <div className="flex justify-center items-center mb-2">
              {getWeatherIcon(item.weather[0].icon)}
            </div>
            <p className="text-center text-lg font-bold text-gray-800">
              {Math.round(item.main.temp)}°C
            </p>
            <div className="flex flex-col items-center mt-2 space-y-1 text-sm text-gray-600">
              {" "}
              <div className="flex items-center">
                <span className="mr-1">High:</span>
                <span className="font-medium">
                  {Math.round(item.main.temp_max)}°C
                </span>
              </div>
              <div className="flex items-center">
                <span className="mr-1">Low:</span>
                <span className="font-medium">
                  {Math.round(item.main.temp_min)}°C
                </span>
              </div>
              <p className="text-center">
                Feels like: {Math.round(item.main.feels_like)}°C
              </p>
              <div className="flex items-center">
                <WiRain className="mr-1" />
                <span>
                  {item.pop ? `${Math.round(item.pop * 100)}%` : "0%"}
                </span>
              </div>
              <div className="flex items-center">
                <WiWindDeg
                  className="mr-1 transform rotate-[${item.wind.deg}deg]"
                  style={{ transform: `rotate(${item.wind.deg}deg)` }}
                />
                <span>{item.wind.speed} m/s</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
