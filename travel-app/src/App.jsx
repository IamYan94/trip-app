import React, { useEffect, useState } from "react";
import "./App.css";
import staticTrips from "./data/trips";
import TripCard from "./components/TripCard/TripCard";
import AddTripCard from "./components/AddTripCard/AddTripCard";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import CurrentWeatherCard from "./components/CurrentWeatherCard/CurrentWeatherCard";

const API_URL = import.meta.env.VITE_WEATHER_API_URL;
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [trips, setTrips] = useState(staticTrips);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  const fetchCurrentWeather = async (city) => {
    try {
      const response = await fetch(
        `${API_URL}/${city}/today?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`
      );
      const data = await response.json();
      setCurrentWeather(data);
    } catch (error) {
      console.error("Error fetching current weather:", error);
    }
  };

  const createTrip = (newTrip) => {
    setTrips([...trips, newTrip]);
    setSelectedTrip(newTrip);
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
        <div className="page-grid__left">
          <h1>
            Weather <b>Forecast</b>
          </h1>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input"
            placeholder="Search your trip"
          />
          <div className="trip-grid">
            {trips
              .filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((trip, index) => (
                <TripCard
                  onClick={() => setSelectedTrip(trip)}
                  key={index}
                  image={trip.image}
                  title={trip.title}
                  startDate={trip.startDate}
                  endDate={trip.endDate}
                  isActive={
                    JSON.stringify(trip) === JSON.stringify(selectedTrip)
                  }
                />
              ))}
            <AddTripCard
              trips={trips}
              onCreateTrip={createTrip}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              cities={staticTrips}
            />
          </div>
          {selectedTrip && (
            <>
              <h2>Weather forecast for {selectedTrip.title} trip</h2>
              <div className="weather-forecast-grid">
                {weatherForecast.map((day, index) => (
                  <WeatherCard
                    key={index}
                    datetime={day.datetime}
                    tempMin={day.tempmin}
                    tempMax={day.tempmax}
                    icon={day.icon}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="page-grid__right">
          {currentWeather && (
            <CurrentWeatherCard
              datetime={currentWeather.days[0].datetime}
              temp={currentWeather.days[0].temp}
              title={currentWeather.resolvedAddress}
              icon={currentWeather.days[0].icon}
              startDate={selectedTrip.startDate}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
