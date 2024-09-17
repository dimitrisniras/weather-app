interface WeatherData {
  dt: number;
  pop: number;
  name: number;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    deg: number;
    speed: number;
  };
}

interface ForecastData {
  list: WeatherData[];
}
