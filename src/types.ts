interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

interface ForecastData {
  list: ForecastItem[];
}

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}
