"use client";

import { WiDaySunny } from 'react-icons/wi';

interface ForecastProps {
  data: ForecastData;
}

function Forecast({ data }: ForecastProps) {
  if (!data || !data.list || data.list.length === 0) return null;

  const hourlyForecasts = data.list.slice(0, 12);

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">Hourly Forecast</h3>
      <div className="flex flex-wrap justify-center">
        {hourlyForecasts.map((item: ForecastItem) => (
          <div key={item.dt} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2 text-center bg-white rounded-lg shadow-md m-2">
            <p className="text-sm">
              {new Date(item.dt * 1000).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <WiDaySunny className="text-3xl mb-1 text-yellow-500 mx-auto" /> 
            <p>Temp: {Math.round(item.main.temp)}°C</p> 
            <p className="text-sm">{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;