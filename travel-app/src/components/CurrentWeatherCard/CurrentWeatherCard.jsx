import PropTypes from "prop-types";
import "./CurrentWeatherCard.css";
import Countdown from "react-countdown";

const CurrentWeatherCard = ({ datetime, temp, title, icon, startDate }) => (
  <div className="current-weather">
    <p className="current-weather__day">
      <b>{new Date(datetime).toLocaleDateString("uk-UA")}</b>
    </p>
    <p className="current-weather__temp">
      <img width={60} src={`/icons/${icon}.svg`} />
      {Math.round(temp)}°
    </p>
    <p className="current-weather__title">{title}</p>
    <div className="current-weather__countdown">
      <Countdown
        date={startDate}
        // eslint-disable-next-line react/prop-types
        renderer={(props) => (
          <>
            <div className="current-weather__countdown-item">
              <p>{props.days}</p>
              <p>Days</p>
            </div>
            <div className="current-weather__countdown-item">
              <p>{props.hours}</p>
              <p>Hours</p>
            </div>
            <div className="current-weather__countdown-item">
              <p>{props.minutes}</p>
              <p>Minutes</p>
            </div>
            <div className="current-weather__countdown-item">
              <p>{props.seconds}</p>
              <p>Seconds</p>
            </div>
          </>
        )}
      />
    </div>
  </div>
);

CurrentWeatherCard.propTypes = {
  datetime: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
};

export default CurrentWeatherCard;
