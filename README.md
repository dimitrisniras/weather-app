# Weather App

A simple but visually appealing weather app built with Next.js, TypeScript, and Tailwind CSS. It allows users to search for weather information for different locations and displays both current weather conditions and hourly forecasts.

## Features

- **Current Weather:** Displays the current temperature, feels-like temperature, condition, humidity, and wind speed for the searched location.
- **Hourly Forecast:** Provides an hourly forecast for the next 12 hours, showing the temperature, condition, and time for each interval.
- **Location Search:** Allows users to search for weather information for any city or location.
- **Responsive Design:** The app is designed to work seamlessly on different screen sizes, from desktop to mobile.
- **Visually Appealing:** Utilizes Tailwind CSS for clean and modern styling.

## Technologies Used

- **Next.js:** A React framework for building server-rendered and statically generated web applications.
- **TypeScript:** A typed superset of JavaScript that adds static types and improves code maintainability.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **OpenWeatherMap API:** Provides weather data for the app.
- **OpenCage Geocoding API:** Provides location track for the app.
- **Axios:** A promise-based HTTP client for making API requests.
- **React Icons:** A library for easily using popular icon sets in React applications.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies:**

   ```bash
   cd weather-app
   npm install
   ```

3. **Obtain an OpenWeatherMap API key:**

   - Sign up for a free account at `https://openweathermap.org/`
   - Create an API key and copy it.

4. **Obtain an OpenCage Geocoding API key:**

   - Sign up for a free account at `https://opencagedata.com/`
   - Create an API key and copy it.

5. **Set up environment variables:**

   - Create a `.env.local` file in the root of the project.
   - Add the following line, replacing `YOUR_OPENWEATHERMAP_API_KEY` and `YOUR_OPENCAGE_API_KEY` with your actual API keys:

     ```env
     NEXT_PUBLIC_WEATHER_API_KEY=YOUR_OPENWEATHERMAP_API_KEY
     NEXT_PUBLIC_OPENCAGE_API_KEY=YOUR_OPENCAGE_API_KEY
     ```

6. **Run the development server:**

   ```bash
   npm run dev
   ```

7. **Open the app in your browser:**

   - The app should be running at `http://localhost:3000`

## Usage

- Enter a city or location in the search bar and press "Search" to get the weather information.
- The current weather conditions will be displayed along with an hourly forecast for the next 12 hours.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

## License

This project is licensed under the Apache-2.0 License.
