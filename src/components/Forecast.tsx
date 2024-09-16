"use client";

interface ForecastProps {
  data: ForecastData
}

function Forecast({ data }: ForecastProps) {
  if (!data) return null;

  // Process forecast data as needed (e.g., group by day)
  const forecastList = data.list.slice(0, 5); // Display first 5 forecast items for simplicity

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Forecast</h3>
      <div className="flex space-x-4">
        {forecastList.map((forecastItem: ForecastItem, index: number) => (
          <div key={index} className="bg-gray-100 p-2 rounded-lg">
            <p>
              {new Date(forecastItem.dt * 1000).toLocaleDateString()} -{' '}
              {new Date(forecastItem.dt * 1000).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <p>Temp: {forecastItem.main.temp}°C</p>
            <p>Condition: {forecastItem.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;