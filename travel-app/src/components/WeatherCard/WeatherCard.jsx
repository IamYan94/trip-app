import PropTypes from "prop-types";
import "./WeatherCard.css";

const WeatherCard = ({ datetime, tempMin, tempMax, icon }) => (
  <div className="weather-card">
    <p>{new Date(datetime).toLocaleDateString("uk-UA")}</p>
    <img width={50} src={`/icons/${icon}.svg`} />
    <p>
      {Math.round(tempMin)}°/{Math.round(tempMax)}°
    </p>
  </div>
);

WeatherCard.propTypes = {
  datetime: PropTypes.string.isRequired,
  tempMin: PropTypes.number.isRequired,
  tempMax: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
};

export default WeatherCard;
