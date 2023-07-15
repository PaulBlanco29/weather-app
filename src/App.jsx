import React, { useState } from 'react';
import axios from 'axios';
import { FiSearch, FiCloud, FiSun, FiCloudRain } from 'react-icons/fi';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = 'fc9fd7319c4c8006642ec34e19a21cf0';

  const searchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`
      );
      setWeather(response.data);
      setError(null);
    } catch (error) {
      setWeather(null);
      setError(error.message);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchWeather();
    }
  };

  const getWeatherIcon = (weather) => {
    if (weather === 'Clouds') {
      return <FiCloud className="text-gray-500 text-3xl mt-2" />;
    } else if (weather === 'Clear') {
      return <FiSun className="text-yellow-500 text-3xl mt-2" />;
    } else if (weather === 'Rain') {
      return <FiCloudRain className="text-blue-500 text-3xl mt-2" />;
    } else {
      return <FiSun className="text-gray-500 text-3xl mt-2" />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white rounded-lg shadow p-8 max-w-xs w-full">
        <h1 className="text-2xl font-bold mb-6">Weather App</h1>
        <div className="flex items-center border border-gray-300 rounded-md p-2">
          <input
            type="text"
            className="flex-1 outline-none text-gray-600"
            placeholder="Enter a city"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="flex-none text-gray-600" onClick={searchWeather}>
            <FiSearch />
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {weather && (
          <div className="mt-4">
            <p className="text-xl">{weather.name}</p>
            <p className="text-gray-500">{weather.weather[0].description}</p>
            {getWeatherIcon(weather.weather[0].main)}
            <p className="text-4xl font-bold mt-2">
              {Math.round(weather.main.temp - 273.15)}°C
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
