import "./App.css";
import { useEffect, useState } from "react";
import staticTrips from "./data/trips";

const API_URL = import.meta.env.VITE_WEATHER_API_URL;
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [trips, setTrips] = useState(staticTrips);
  const [selectedTrip, setSelectedTrip] = useState();
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);

  const fetchWeatherForecast = async (city, startDate, endDate) => {
    try {
      const response = await fetch(
        `${API_URL}/${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`
      );
      const data = await response.json();
      setWeatherForecast(data.days);
    } catch (error) {
      console.error("Error fetching weather forecast:", error);
    }
  };

  useEffect(() => {
    if (selectedTrip) {
      fetchWeatherForecast(
        selectedTrip.title,
        selectedTrip.startDate,
        selectedTrip.endDate
      );
      fetchCurrentWeather(selectedTrip.title);
    }
  }, [selectedTrip]);

  return (
    <div className="container">
      <div className="page-grid">
        <h1>
          Weather <b>Forecast</b>
        </h1>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input"
          placeholder="Search your trip"
        />
      </div>
    </div>
  );
}

export default App;
