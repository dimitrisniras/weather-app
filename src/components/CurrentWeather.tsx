"use client"

interface CurrentWeatherProps {
  data: WeatherData
}

function CurrentWeather({ data }: CurrentWeatherProps) {
  if (!data) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
      <p>
        <span className="font-semibold">Temperature:</span> {data.main.temp}°C
      </p>
      <p>
        <span className="font-semibold">Feels like:</span> {data.main.feels_like}°C
      </p>
      <p>
        <span className="font-semibold">Condition:</span> {data.weather[0].description}
      </p>
      <p>
        <span className="font-semibold">Humidity:</span> {data.main.humidity}%
      </p>
      <p>
        <span className="font-semibold">Wind speed:</span> {data.wind.speed} m/s
      </p>
    </div>
  );
}

export default CurrentWeather;